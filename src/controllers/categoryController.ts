import { Request, Response } from "express";
import categoryModel from '../models/category';

export const list = async (req: Request, res: Response) => {
    try {
        const [categories, total] = await Promise.all([
            categoryModel.find({}).exec(),
            categoryModel.countDocuments().exec()
        ]);

        res.status(200).json({
            total: total,
            data: categories
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

    let category;
    try {
        category = await categoryModel.create(data);
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        })
        return;
    }

    res.status(200).json(category);
}

export const update = async(req: Request, res:Response) => {
    const data = req.body;
    const categoryId = req.params.id

    let category;
    try {
        category = await categoryModel.findByIdAndUpdate(categoryId, data, {new: true, upsert: true}).lean().exec();
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        })
        return;
    }

    if (!category) {
        res.status(404).json({
            message: 'No such category.'
        });
        return;
    }

    res.status(200).json(category);
}

export const remove = async(req: Request, res:Response) => {
    const categoryId = req.params.id;
    
    let category;
    try {
        category = await categoryModel.findByIdAndRemove(categoryId).lean().exec();
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        })
        return;
    }

    if (!category) {
        res.status(404).json({
            message: 'No such category.'
        });
        return;
    }

    res.status(200).json(category);
}
