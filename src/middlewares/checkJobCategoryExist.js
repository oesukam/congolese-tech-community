import { JobCategory } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { exist } from '../constants/responseMessages';

const checkJobCategory = async (req, res, next) => {
  const { name } = req.body;

  const foundJobCategory = await JobCategory.findOne({
    name,
  })
    .select('-__v')
    .populate('author', '-userCategory -__v -password');

  if (foundJobCategory) {
    return res.status(statusCodes.CONFLICT).json({
      status: statusCodes.CONFLICT,
      message: exist(name),
    });
  }

  req.jobCategory = foundJobCategory;

  next();
};

export default checkJobCategory;
