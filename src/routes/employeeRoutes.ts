import express from 'express';
import checkJwt from './middlewares/checkJwt';
import requiredPermission from './middlewares/requiredPermission';
import * as employeeController from '../controllers/employeeController';

const router = express.Router();

router.route('/')
    .get(employeeController.list)
    .post(employeeController.create);

router.route('/:id')
    .get(employeeController.detail)
    .put(employeeController.update)
    .delete(employeeController.remove);

export default router;
