import { Request, Response } from 'express'
import orderModel from '../models/order';
import moment from 'moment';

export const revenueReport = async (req: Request, res: Response) => {
    const { fromDate, toDate } = req.query;

    let data: any[];
    try {
        data = await orderModel.aggregate(
            [
                {
                    $match: {
                        createdAt: {
                            $gte: fromDate && new Date(fromDate) || moment().startOf('isoWeek').toDate(),
                            $lte: toDate && new Date(toDate) || moment().endOf('isoWeek').toDate()
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        revenue: { $sum: '$totalAmount' },
                        orderCount: { $sum: 1 }
                    }
                }
            ]
        ).exec();
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.'
        });
        return;
    }

    let report: any;
    if (data.length === 0) {
        report = {
            orderCount: 0,
            revenue: 0
        }
    } else {
        report = data[0];
    }

    res.status(200).json(report);
}
