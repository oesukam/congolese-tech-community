import express from 'express';
import { celebrate } from 'celebrate';
import { ProfileController } from '../../../controllers';
import { profileValidator } from './validators';
import { checkAuth, asyncHandler, checkProfile } from '../../../middlewares';

const router = express.Router();

router.route('/').get(asyncHandler(ProfileController.getProfiles));

router
  .route('/:username')
  .all(checkProfile)
  .get(asyncHandler(ProfileController.getProfile))
  .put(
    checkAuth,
    celebrate({ body: profileValidator.updateProfile }),
    asyncHandler(ProfileController.updateProfile),
  );

export default router;
