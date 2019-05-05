import { Request, Response } from 'express';
import * as _ from 'lodash';
import productModel from '../models/product';

export const create = async (req: Request, res: Response) => {
    const data = req.body;

    let product;
    try {
        product = await productModel.create(data);
    } catch (ex) {
        res.status(500).json({ message: '', error: ex });
        return;
    }

    res.status(200).json(product);
}

export const remove = async (req: Request, res: Response) => {

}

export const update = async (req: Request, res: Response) => {

}
