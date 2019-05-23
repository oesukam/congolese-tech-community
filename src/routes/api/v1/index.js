import express from 'express';
import posts from './posts';
import auth from './auth';

const router = express.Router();

router.use('/posts', posts);
router.use('/auth', auth);

export default router;
