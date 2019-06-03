import express from 'express';
import { celebrate } from 'celebrate';
import { UserNotificationController } from '../../../controllers';
import { experienceValidator } from './validators';
import { checkAuth, asyncHandler, mobileDetect } from '../../../middlewares';

const router = express.Router();

router
  .route('/push')
  .post(
    checkAuth,
    mobileDetect,
    asyncHandler(UserNotificationController.getAllExperiences),
  )
  .post(
    checkAuth,
    mobileDetect,
    celebrate({ body: experienceValidator.createExperience }),
    asyncHandler(UserNotificationController.createExperience),
  );

export default router;
