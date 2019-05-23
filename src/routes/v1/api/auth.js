import express from 'express';
import passport from '../../../config/passport';
import Auth from '../../../controllers/auth';
import asyncHandler from '../../../middlewares/asyncHandler';

const router = express.Router();

router.route('/google').get(passport.authenticate('google', { scope: ['email', 'profile'], }));

router.route('/google/redirect').get(passport.authenticate('google'), asyncHandler(Auth.socialAuth));

router.route('/facebook').get(passport.authenticate('facebook'));

router.route('/facebook/redirect').get(passport.authenticate('facebook', { scope: ['email'] }), asyncHandler(Auth.socialAuth));

router.route('/github').get(passport.authenticate('github'));

router.route('/github/redirect').get(passport.authenticate('github'), asyncHandler(Auth.socialAuth));

export default router;
