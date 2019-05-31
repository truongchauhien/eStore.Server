import { Request, Response } from 'express';
import supplyModel from '../models/supply';
import productModel from '../models/product';

export const create = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;

    let supply;
    try {
        supply = await supplyModel.create(data);
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        });
        return;
    }

    res.status(200).json(supply);
}

export const list = async (req: Request, res: Response): Promise<void> => {
    const { filter } = req.query;

    const buildQuery = () => {
        let query = supplyModel.find({})
        switch (filter) {
            case 'pending':
                query = query.where('isApproved').equals(false);
                break;
            case 'approved':
                query = query.where('isApproved').equals(true)
                    .where('isReceived').equals(false)
                    .sort({ deliveryDate: 'asc' });
                break;
            case 'received':
                query = query.where('isReceived').equals(true);
                break;
            default:
                break;
        }
        query = query.populate('product');
        return query;
    };

    try {
        const [supplies, total] = await Promise.all([
            buildQuery().lean().exec(),
            buildQuery().countDocuments().lean().exec()
        ]);

        res.status(200).json({
            total: total,
            data: supplies
        });
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        });
    }
}

export const update = async (req: Request, res: Response): Promise<void> => {
    const supplyId = req.params.id;
    let data = req.body;

    let supply;
    try {
        if (data.isApproved) {
            data.approvedDate = new Date();
        }

        if (data.isReceived) {
            data.receivedDate = new Date();
        }

        supply = await supplyModel.findByIdAndUpdate(supplyId, data, { new: true }).lean().exec();
        if (supply && data.isReceived) {
            await productModel.findByIdAndUpdate(supply.product, { $inc: { quantity: supply.quantity || 0 } }, { new: true }).lean().exec();
        }
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    if (!supply) {
        res.status(404).json({ message: 'No such supply.' });
        return;
    }

    res.status(200).json(supply);
}

export const remove = async (req: Request, res: Response): Promise<void> => {
    const supplyId = req.params.id;

    let supply;
    try {
        supply = await supplyModel.findByIdAndDelete(supplyId).lean().exec();
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    if (!supply) {
        res.status(404).json({ message: 'No such supply.' });
        return;
    }

    res.status(200).json(supply);
}
