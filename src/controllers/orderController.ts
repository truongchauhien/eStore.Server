import { Request, Response } from "express";
import OrderModel from "../models/order";

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;

    let order;
    try {
        order = await OrderModel.create(data);
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.'
        });
    }

    res.status(200).json(order);
}
