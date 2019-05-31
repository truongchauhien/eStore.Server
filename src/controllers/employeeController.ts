import { Request, Response } from 'express'
import employeeModel from '../models/employee';
import bcrypt from 'bcrypt';

export const list = async (req: Request, res: Response) => {
    const { name, idNumber } = req.query;
    let { offset, limit } = req.query
    offset = Number(offset || 0);
    limit = Number(limit || 20);

    const buildQuery = () => {
        let employeeQuery = employeeModel.find({});
        if (name) {
            employeeQuery = employeeQuery.where('fullName').regex(new RegExp(`${name}`, 'i'))
        }
        if (idNumber) {
            employeeQuery = employeeQuery.where('idNumber').regex(new RegExp(`${idNumber}`, 'i'))
        }
        return employeeQuery;
    }

    try {
        const [employees, total] = await Promise.all([
            buildQuery().skip(offset).limit(limit).lean().exec(),
            buildQuery().countDocuments().lean().exec()
        ]);

        res.status(200).json({
            total: total,
            data: employees
        });
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        });
    }
}

export const detail = async (req: Request, res: Response) => {
    res.status(200).end();
}

export const create = async (req: Request, res: Response) => {
    const data = req.body;

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 12);
    }

    let employee;
    try {
        employee = await employeeModel.create(data);
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        });
        return;
    }

    res.status(200).json(employee);
}

export const update = async (req: Request, res: Response) => {
    const employeeId = req.params.id;
    const data = req.body;

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 12);
    }

    delete data._id;
    let employee;
    try {
        employee = await employeeModel.findByIdAndUpdate(employeeId, data, { new: true }).lean().exec();
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        });
        return;
    }

    if (!employee) {
        res.status(404).json({
            message: 'No such employee.'
        });
        return;
    }

    res.status(200).json(employee);
}

export const remove = async (req: Request, res: Response) => {
    const employeeId = req.params.id;

    let employee;
    try {
        employee = await employeeModel.findByIdAndDelete(employeeId).lean().exec();
    } catch (ex) {
        res.status(500).json({
            message: 'Internal server error.',
            error: ex
        });
        return;
    }

    if (!employee) {
        res.status(404).json({
            message: 'No such employee.'
        });
        return;
    }

    res.status(200).json(employee);
}
