import express from 'express';
import Auth from './v1/api/auth';

const router = express.Router();

router.use('/auth', Auth);

export default router;
