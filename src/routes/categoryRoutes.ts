import express from 'express';
import checkJwt from './middlewares/checkJwt';
import requiredPermission from './middlewares/requiredPermission';
import * as categoryController from '../controllers/categoryController';

const router = express.Router();

router.route('/')
    .get(categoryController.list)
    .post(categoryController.create);

router.route('/:id')
    .get(categoryController.detail)
    .put(categoryController.update)
    .delete(categoryController.remove);

export default router;
