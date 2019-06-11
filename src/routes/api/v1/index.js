import express from 'express';
import posts from './posts';
import auth from './auth';
import jobs from './jobs';
import recommendations from './recommendations'
import chat from './chat';
import profiles from './profiles';
import educations from './educations';
import experiences from './experiences';
import projects from './projects';
import notifications from './notifications';

const router = express.Router();

router.use('/posts', posts);
router.use('/auth', auth);
router.use('/jobs', jobs);
router.use('/recommendations', recommendations);
router.use('/chats', chat);
router.use('/profiles', profiles);
router.use('/educations', educations);
router.use('/experiences', experiences);
router.use('/projects', projects);
router.use('/notifications', notifications);

export default router;
