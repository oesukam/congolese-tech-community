import express from 'express';
import { celebrate } from 'celebrate';
import { RecommendationController } from '../../../controllers';
import { recommendationValidator } from './validators';
import { checkAuth, asyncHandler, userExist } from '../../../middlewares';

const router = express.Router();

router
    .route('/:username')
    .post(
        checkAuth,
        userExist,
        celebrate({ body: recommendationValidator.recommend }),
        asyncHandler(RecommendationController.recommend),
    ).get(
        userExist,
        asyncHandler(RecommendationController.get)
    );

router
    .route('/:recommendation')
    .put(
        checkAuth,
        celebrate({ body: recommendationValidator.recommend }),
        asyncHandler(RecommendationController.update),
    )

router.route('/:recommendation/approve')
    .post(
        checkAuth,
        asyncHandler(RecommendationController.approve)
    ).delete(
        checkAuth,
        asyncHandler(RecommendationController.disapprove)
    )

export default router;
