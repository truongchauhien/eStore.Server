import { Request, Response } from 'express';
import * as _ from 'lodash';
import productModel from '../models/product';

export const list = async (req: Request, res: Response) => {
    let { name, offset, limit } = req.query;

    try {
        offset = Number(offset && 0);
        limit = Number(limit && 20);

        let productQuery = productModel.find({}).skip(offset).limit(limit);
        if (name) {
            productQuery = productQuery.where('name').regex(new RegExp(`${name}`, 'i'));
        }

        const [products, total] = await Promise.all([
            productQuery.lean().exec(),
            productModel.countDocuments().exec()
        ]);

        res.status(200).json({
            total: total,
            offset: offset,
            limit: limit,
            data: products
        })
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        });
    }
}

export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const idType = req.query.type;

    let product;
    try {
        if (idType === 'upc') {
            product = await productModel.findOne({ upc: id }).lean().exec();
        } else {
            product = await productModel.findById(id).lean().exec();
        }
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    if (!product) {
        res.status(404).json({ message: 'No such product.' });
        return;
    }

    res.status(200).json(product);
}

export const create = async (req: Request, res: Response) => {
    const data = req.body;

    let product;
    try {
        product = await productModel.create(data);
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    res.status(200).json(product);
}

export const remove = async (req: Request, res: Response) => {
    const productId = req.params.id;

    let product;
    try {
        product = await productModel.findByIdAndDelete(productId).lean().exec();
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    if (!product) {
        res.status(404).json({ message: 'No such product.' });
        return;
    }

    res.status(200).json(product);
}

export const update = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const data = req.body;

    let product;
    try {
        product = await productModel.findByIdAndUpdate(productId, data, { upsert: true, new: true }).lean().exec();
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    if (!product) {
        res.status(404).json({ message: 'No such product.' });
        return;
    }

    res.status(200).json(product);
}
