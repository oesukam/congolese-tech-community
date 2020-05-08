import express from 'express';
import { celebrate } from 'celebrate';
import { FollowController } from '../../../controllers';
import { checkAuth, asyncHandler, checkUsername } from '../../../middlewares';
import { profileValidator } from './validators';

const router = express.Router();

router
  .route('/:username')
  .all(asyncHandler(checkAuth))
  .all(asyncHandler(checkUsername))
  .post(asyncHandler(FollowController.follow))
  .delete(asyncHandler(FollowController.unFollow))

router
  .route('/:username/all')
  .all(asyncHandler(checkAuth))
  .get(
    celebrate({ query: profileValidator.getFollowersQueryParms }),
    asyncHandler(FollowController.getAll)
    );

router
  .route('/:username/verify')
  .all(asyncHandler(checkAuth))
  .get(FollowController.verify)

export default router;
