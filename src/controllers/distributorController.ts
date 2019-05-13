import { Request, Response } from "express";
import distributorModel from '../models/distributor';

export const list = async (req: Request, res: Response) => {
    try {
        const [distributors, total] = await Promise.all([
            distributorModel.find({}).exec(),
            distributorModel.countDocuments().exec()
        ]);

        res.status(200).json({
            total: total,
            data: distributors
        });
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

export const detail = async(req: Request, res:Response) => {
    res.status(200).end();
}

export const create = async(req: Request, res:Response) => {
    const data = req.body;

    let distributor;
    try {
        distributor = await distributorModel.create(data);
    } catch (ex) {
        res.status(500).json({ message: '', error: ex });
        return;
    }

    res.status(200).json(distributor);
}

export const update = async(req: Request, res:Response) => {
    const data = req.body;
    const distributorId = req.params.id

    let distributor;
    try {
        distributor = await distributorModel.findByIdAndUpdate(distributorId, data, {new: true, upsert: true}).lean().exec();
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        })
        return;
    }

    if (!distributor) {
        res.status(404).json({
            message: 'No such distributor.'
        });
        return;
    }

    res.status(200).json(distributor);
}

export const remove = async(req: Request, res:Response) => {
    const distributorId = req.params.id;
    
    let distributor;
    try {
        distributor = await distributorModel.findByIdAndRemove(distributorId).lean().exec();
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        })
        return;
    }

    if (!distributor) {
        res.status(404).json({
            message: 'No such distributor.'
        });
        return;
    }

    res.status(200).json(distributor);
}
