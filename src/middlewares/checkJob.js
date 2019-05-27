import { Job } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const checkJob = async (req, res, next) => {
  const { jobSlug: slug } = req.params;

  const foundJob = await Job.findOne({
    slug,
    status: { $ne: 'deleted' },
  })
    .select('-__v')
    .populate('author', '-userType -__v -password');

  if (!foundJob) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: statusCodes.NOT_FOUND,
      message: notExist('Job'),
    });
  }

  req.job = foundJob;

  next();
};

export default checkJob;
