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
  .get(
    asyncHandler(checkOrganization),
    asyncHandler(OrganizationController.get),
  );

export default router;
