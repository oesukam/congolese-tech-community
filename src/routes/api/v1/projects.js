import express from 'express';
import { celebrate } from 'celebrate';
import { ProjectController } from '../../../controllers';
import { projectValidator } from './validators';
import { checkAuth, asyncHandler, checkProject } from '../../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(checkAuth, asyncHandler(ProjectController.getAllProjects))
  .post(
    checkAuth,
    celebrate({ body: projectValidator.createProject }),
    asyncHandler(ProjectController.createProject),
  );

router
  .route('/:projectId')
  .all(asyncHandler(checkProject))
  .put(
    checkAuth,
    celebrate({ body: projectValidator.updateProject }),
    asyncHandler(ProjectController.updateProject),
  )
  .delete(checkAuth, asyncHandler(ProjectController.deleteProject));

export default router;
