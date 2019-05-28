import express from 'express';
import posts from './posts';
import auth from './auth';
import jobs from './jobs';
import chat from './chat';

const router = express.Router();

router.use('/posts', posts);
router.use('/auth', auth);
router.use('/jobs', jobs);
router.use('/chats', chat);

export default router;
