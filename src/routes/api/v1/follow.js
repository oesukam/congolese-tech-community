import express from 'express';
import { FollowController } from '../../../controllers';
import { checkAuth, asyncHandler, checkUsername, checkUserFromParams } from '../../../middlewares';

const router = express.Router();

router
  .route('/:username')
  .all(asyncHandler(checkAuth))
  .all(asyncHandler(checkUsername))
  .post(asyncHandler(FollowController.follow))
  .delete(asyncHandler(FollowController.unFollow));
  
router
  .route('/:username/followers')
  .get(asyncHandler(checkUserFromParams), asyncHandler(FollowController.getFollowers));

router
  .route('/:username/followings')
  .get(asyncHandler(checkUserFromParams), asyncHandler(FollowController.getFollowings));


export default router;
