import express from 'express';
import { celebrate } from 'celebrate';
import { JobController, JobCategoryController, LikesController } from '../../../controllers';
import { jobValidator, jobCategoryValidator } from './validators';
import {
  checkAuth,
  checkRoles,
  asyncHandler,
  checkJob,
  checkJobCategory,
  checkJobCategoryExist,
} from '../../../middlewares';

const router = express.Router();

router
  .route('/categories')
  .post(
    checkAuth,
    checkRoles(['admin']),
    celebrate({ body: jobCategoryValidator.createJobCategory }),
    checkJobCategoryExist,
    asyncHandler(JobCategoryController.createJobCategory),
  )
  .get(asyncHandler(JobCategoryController.getJobAllCategories));

router
  .route('/categories/:jobCategorySlug')
  .get(checkJobCategory, asyncHandler(JobCategoryController.getJobCategory))
  .put(
    checkAuth,
    checkRoles(['admin']),
    celebrate({ body: jobCategoryValidator.updateJobCategory }),
    checkJobCategory,
    asyncHandler(JobCategoryController.updateJobCategory),
  )
  .delete(
    checkAuth,
    checkRoles(['admin']),
    checkJobCategory,
    asyncHandler(JobCategoryController.deleteJobCategory),
  );

router
  .route('/')
  .post(
    checkAuth,
    celebrate({ body: jobValidator.createJob }),
    checkJobCategory,
    asyncHandler(JobController.createJob),
  )
  .get(asyncHandler(JobController.getJobs));

router
  .route('/:jobSlug')
  .all(checkJob)
  .get(asyncHandler(JobController.getJob))
  .put(
    checkAuth,
    celebrate({ body: jobValidator.createJob }),
    asyncHandler(JobController.updateJob),
  )
  .delete(checkAuth, asyncHandler(JobController.deleteJob));

router.route('/:jobSlug/like')
  .post(
    checkAuth,
    checkJob,
    asyncHandler(LikesController.likeJob),
  ).delete(
    checkAuth,
    checkJob,
    asyncHandler(LikesController.unlikejob),
  );

export default router;
