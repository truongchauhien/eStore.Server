import express from 'express';
import checkJwt from './middlewares/checkJwt';
import requiredPermission from './middlewares/requiredPermission';
import * as productController from '../controllers/productController';

const router = express.Router();

router.route('/')
    .get(productController.list)
    .post(productController.create);

router.route('/:id')
    .get(productController.detail)
    .put(productController.update)
    .delete(productController.remove);

export default router;
