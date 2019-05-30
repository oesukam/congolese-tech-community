import { PersonExperience } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const checkExperience = async (req, res, next) => {
  const { experienceId: _id } = req.params;

  const foundExperience = await PersonExperience.findOne({
    _id,
  });

  if (!foundExperience) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: statusCodes.NOT_FOUND,
      message: notExist('Experience'),
    });
  }

  req.personExperience = foundExperience;

  next();
};

export default checkExperience;
