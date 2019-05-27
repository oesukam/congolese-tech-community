import express from 'express';
import { celebrate } from 'celebrate';
import passport from '../../../config/passport';
import AuthController from '../../../controllers/AuthController';
import { authValidator } from './validators';
import { asyncHandler, checkUser, verifyToken } from '../../../middlewares';

const router = express.Router();

router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['email', 'profile'] }));

router
  .route('/google/redirect')
  .get(
    passport.authenticate('google'),
    asyncHandler(AuthController.socialAuth),
  );

router.route('/facebook').get(passport.authenticate('facebook'));

router
  .route('/facebook/redirect')
  .get(
    passport.authenticate('facebook', { scope: ['email'] }),
    asyncHandler(AuthController.socialAuth),
  );

router.route('/github').get(passport.authenticate('github'));

router
  .route('/github/redirect')
  .get(
    passport.authenticate('github'),
    asyncHandler(AuthController.socialAuth),
  );

router
  .route('/signup')
  .post(
    checkUser,
    celebrate({ body: authValidator.signup }),
    asyncHandler(AuthController.signup),
  );

router
  .route('/login')
  .post(
    celebrate({ body: authValidator.login }),
    asyncHandler(AuthController.login),
  );

router
  .route('/verification/:token')
  .get(verifyToken, asyncHandler(AuthController.verification));

export default router;
