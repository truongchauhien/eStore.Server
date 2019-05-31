import { Request, Response } from "express";
import orderModel from "../models/order";
import productModel from '../models/product';
import moment from 'moment';
import * as _ from 'lodash';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;

    let order;
    try {
        for (const product of _.get(data, 'items', [])) {
            const quantity = _.get(product, 'quantity', 0);
            await productModel.findOneAndUpdate({ upc: product.upc }, { $inc: { quantity: -quantity || 0 } }, { new: true }).lean().exec();
        }
        data.createdAt = moment().toDate();
        order = await orderModel.create(data);
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.'
        });
    }

    res.status(200).json(order);
}
