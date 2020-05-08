import { profileService } from '../services/profileService';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const checkProfile = async (req, res, next) => {
  const { username } = req.params;

  const foundProfile = await profileService.getCompleteProfile(username);

  if (!foundProfile) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: statusCodes.NOT_FOUND,
      message: notExist('Profile'),
    });
  }

  req.profile = {
    ...foundProfile._doc
  };

  next();
};

export default checkProfile;
