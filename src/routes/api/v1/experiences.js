import express from 'express';
import { celebrate } from 'celebrate';
import { ExperienceController } from '../../../controllers';
import { experienceValidator } from './validators';
import { checkAuth, asyncHandler, checkExperience } from '../../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(checkAuth, asyncHandler(ExperienceController.getAllExperiences))
  .post(
    checkAuth,
    celebrate({ body: experienceValidator.createExperience }),
    asyncHandler(ExperienceController.createExperience),
  );

router
  .route('/:experienceId')
  .all(asyncHandler(checkExperience))
  .put(
    checkAuth,
    celebrate({ body: experienceValidator.updateExperience }),
    asyncHandler(ExperienceController.updateExperience),
  )
  .delete(checkAuth, asyncHandler(ExperienceController.deleteExperience));

export default router;
