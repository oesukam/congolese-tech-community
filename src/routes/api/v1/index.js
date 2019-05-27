import express from 'express';
import posts from './posts';
import auth from './auth';
import jobs from './jobs';

const router = express.Router();

router.use('/posts', posts);
router.use('/auth', auth);
router.use('/jobs', jobs);

export default router;
