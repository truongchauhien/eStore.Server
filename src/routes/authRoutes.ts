import express from 'express';
import employeeModel from '../models/employee';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

const router = express.Router();

router.route('/login').post(async (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;

    if (!userName || !password) {
        res.status(400).json({ message: 'Missing user name or password' });
        return;
    }

    let employee;
    try {
        employee = await employeeModel
            .findOne({ userName: userName }, '_id userName password')
            .lean()
            .exec();
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    if (!employee) {
        res.status(404).json({ message: "No such user name." });
        return;
    }

    let isMatchingPassword = false;
    try {
        isMatchingPassword = await bcrypt.compare(password, employee.password)
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    if (!isMatchingPassword) {
        res.status(401).json({ message: 'Wrong password.' });
        return;
    }

    let refreshToken = crypto.randomBytes(64).toString('hex');

    try {
        employee = await employeeModel.findByIdAndUpdate(employee._id,
            { $set: { refreshToken: refreshToken } },
            { new: true, upsert: true, select: '_id userName roles fullName' }
        ).lean().exec();
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    const jwtPayload = {
        _id: employee._id,
        roles: employee.roles
    };

    const accessToken = jwt.sign(
        jwtPayload,
        config.get('jwtSecretKey'),
        { expiresIn: '1h' }
    );

    const employeeDocumentId = employee._id
    delete employee._id;
    res.status(200).json({
        userId: employeeDocumentId,
        accessToken: accessToken,
        expiredAt: (jwt.decode(accessToken, { complete: true }))['payload']['exp'] * 1000,
        refreshToken: refreshToken,
        user: employee
    })
});

router.route('/token').post(async (req, res) => {
    const { userId, refreshToken } = req.body;
    if (!userId || !refreshToken) {
        res.status(400).json({ message: 'Missing employee id  or refresh token.' });
    }

    let employee;
    try {
        employee = await employeeModel.findById(userId, '_id refreshToken').lean().exec();
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    if (!employee) {
        res.status(404).json({ message: 'No such user.' });
        return;
    }

    if (employee.refreshToken !== refreshToken) {
        res.status(401).json({ message: 'Refresh token was not matching.' });
        return;
    }

    const newRefreshToken = crypto.randomBytes(64).toString('hex');
    try {
        employee = await employeeModel.findByIdAndUpdate(employee._id,
            { $set: { refreshToken: newRefreshToken } },
            { upsert: true, new: true, select: '_id userName roles fullName' }
        ).lean().exec();
    } catch (ex) {
        res.status(500).json({ message: 'Internal server error.', error: ex });
        return;
    }

    const jwtPayload = {
        id: employee._id,
        roles: employee.roles
    };

    const accessToken = jwt.sign(
        jwtPayload,
        config.get('jwtSecretKey'),
        { expiresIn: '1h' }
    );

    delete employee._id;
    res.status(200).json({
        accessToken: accessToken,
        expiredAt: (jwt.decode(accessToken, { complete: true }))['payload']['exp'] * 1000,
        refreshToken: newRefreshToken,
        user: employee
    })
});

export default router;
