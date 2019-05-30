import { PersonEducation } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const checkEducation = async (req, res, next) => {
  const { educationId: _id } = req.params;

  const foundEducation = await PersonEducation.findOne({
    _id,
  });

  if (!foundEducation) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: statusCodes.NOT_FOUND,
      message: notExist('Education'),
    });
  }

  req.personEducation = foundEducation;

  next();
};

export default checkEducation;
