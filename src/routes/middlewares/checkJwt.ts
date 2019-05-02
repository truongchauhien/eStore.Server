import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../../utils/config';

const jwtSecretKey = config.get('jwtSecretKey');

function checkJwt(req: Request, res: Response, next: NextFunction) {
    let accessToken = req.headers['x-access-token'] as string;
    if (!accessToken) {
        res.status(403).json({
            message: 'No token found.'
        });
        return;
    }

    try {
        const payload = jwt.verify(accessToken, jwtSecretKey)
        req['user'] = payload;

        next();
    } catch {
        res.status(403).json({
            message: 'The token was invalid.'
        });
        return;
    }    
}

export default checkJwt;
