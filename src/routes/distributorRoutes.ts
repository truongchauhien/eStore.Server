import express from 'express';
import checkJwt from './middlewares/checkJwt';
import requiredPermission from './middlewares/requiredPermission';
import * as distributorController from '../controllers/distributorController';

const router = express.Router();

router.route('/')
    .get(distributorController.list)
    .post(distributorController.create);

router.route('/:id')
    .get(distributorController.detail)
    .put(distributorController.update)
    .delete(distributorController.remove);

export default router;
