import { User } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const checkProfile = async (req, res, next) => {
  const { username } = req.params;

  const foundProfile = await User.findOne({
    username,
    status: { $ne: 'deleted' },
  })
    .select('username email picture city country info')
    .populate('info', '-__v');

  if (!foundProfile) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: statusCodes.NOT_FOUND,
      message: notExist('Profile'),
    });
  }

  req.profile = foundProfile;

  next();
};

export default checkProfile;
