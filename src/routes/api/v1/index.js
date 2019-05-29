import express from 'express';
import posts from './posts';
import auth from './auth';
import jobs from './jobs';
import chat from './chat';
import profiles from './profiles';
import educations from './educations';
import experiences from './experiences';
import projects from './projects';

const router = express.Router();

router.use('/posts', posts);
router.use('/auth', auth);
router.use('/jobs', jobs);
router.use('/chats', chat);
router.use('/profiles', profiles);
router.use('/educations', educations);
router.use('/experiences', experiences);
router.use('/projects', projects);

export default router;
