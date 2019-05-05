import express from 'express';
import checkJwt from './middlewares/checkJwt';
import requiredPermission from './middlewares/requiredPermission';
import * as productController from '../controllers/productController';

const router = express.Router();

router.route('/').post(productController.create);

export default router;
