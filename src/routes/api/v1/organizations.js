import express from 'express';
import { celebrate } from 'celebrate';
import { OrganizationController } from '../../../controllers';
import {
  asyncHandler,
  checkOrganization,
  checkAuth,
} from '../../../middlewares';
import { organizationValidator } from './validators';

const router = express.Router();

router
  .route('/')
  .get(asyncHandler(OrganizationController.getAll))
  .post(
    checkAuth,
    celebrate({ body: organizationValidator.post }),
    asyncHandler(OrganizationController.post),
  );

router
  .route('/:organizationId')
  .all(asyncHandler(checkOrganization))
  .get(asyncHandler(OrganizationController.get))
  .put(
    checkAuth,
    celebrate({ body: organizationValidator.update }),
    asyncHandler(OrganizationController.update),
  );

export default router;
