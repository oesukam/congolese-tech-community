import express from 'express';
import { celebrate } from 'celebrate';
import { EducationController } from '../../../controllers';
import { educationValidator } from './validators';
import { checkAuth, asyncHandler, checkEducation } from '../../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(checkAuth, asyncHandler(EducationController.getAllEducations))
  .post(
    checkAuth,
    celebrate({ body: educationValidator.createEducation }),
    asyncHandler(EducationController.createEducation),
  );

router
  .route('/:educationId')
  .all(asyncHandler(checkEducation))
  .put(
    checkAuth,
    celebrate({ body: educationValidator.updateEducation }),
    asyncHandler(EducationController.updateEducation),
  )
  .delete(checkAuth, asyncHandler(EducationController.deleteEducation));

export default router;
