import express from 'express';
import * as reportController from '../controllers/reportController';

const reportRouter = express.Router();

reportRouter.route('/revenue')
    .get(reportController.revenueReport);

export default reportRouter;
