import express from 'express';
import userRoutes from './user';
import errorMiddleware from './middlewares/error';

const router = express.Router();

router.use('/user', userRoutes);

router.use(errorMiddleware);

export default router;
