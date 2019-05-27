import { JobCategory } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const checkJobCategory = async (req, res, next) => {
  const { jobCategorySlug: slug } = req.params;
  const { category } = req.body;

  const foundJobCategory = await JobCategory.findOne({
    slug: slug || category,
  })
    .select('-__v')
    .populate('author', '-userCategory -__v -password');

  if (!foundJobCategory) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: statusCodes.NOT_FOUND,
      message: notExist('Job Category'),
    });
  }

  req.jobCategory = foundJobCategory;

  next();
};

export default checkJobCategory;
