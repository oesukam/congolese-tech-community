import express from 'express';
import { celebrate } from 'celebrate';
import { FeedController } from '../../../controllers';
import { asyncHandler, optionalCheckAuth } from '../../../middlewares';
import feedValidator from './validators/feedValidator';

const router = express.Router();

router
  .route('/')
  .get(
    celebrate({ query: feedValidator.query }),
    optionalCheckAuth,
    asyncHandler(FeedController.getFeed),
  );

router
  .route('/organization')
  .get(
    celebrate({ query: feedValidator.query }),
    optionalCheckAuth,
    asyncHandler(FeedController.getOrganizationsFeed),
  );

export default router;
