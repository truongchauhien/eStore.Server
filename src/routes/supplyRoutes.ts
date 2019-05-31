import * as express from 'express';
import checkJwt from './middlewares/checkJwt';
import requiredPermission from './middlewares/requiredPermission';
import * as supplyController from '../controllers/supplyController';

const router = express.Router();

router.route('/')
    .get(supplyController.list)
    .post(supplyController.create);

router.route('/:id')
    .put(supplyController.update)
    .delete(supplyController.remove);

export default router;
