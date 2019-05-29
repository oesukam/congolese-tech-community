import express from 'express';
import { celebrate } from 'celebrate';
import { PostController } from '../../../controllers';
import { postValidator } from './validators';
import { checkAuth, asyncHandler, checkPost } from '../../../middlewares';

const router = express.Router();

router
  .route('/')
  .post(
    checkAuth,
    celebrate({ body: postValidator.createPost }),
    asyncHandler(PostController.createPost),
  )
  .get(asyncHandler(PostController.getPosts));

router
  .route('/:postSlug')
  .all(checkPost)
  .get(asyncHandler(PostController.getPost))
  .put(
    checkAuth,
    celebrate({ body: postValidator.updatePost }),
    asyncHandler(PostController.updatePost),
  )
  .delete(checkAuth, asyncHandler(PostController.deletePost));

export default router;
