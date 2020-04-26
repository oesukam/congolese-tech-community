import { User, Follow } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const checkProfile = async (req, res, next) => {
  const { username } = req.params;

  const foundProfile = await User.findOne({
    username,
    status: { $ne: 'deleted' },
  })
    .select(['-status', '-createdAt', '-updatedAt', '-password'])
    .populate('info', '-__v');

  if (!foundProfile) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: statusCodes.NOT_FOUND,
      message: notExist('Profile'),
    });
  }

  req.profile = {
    ...foundProfile['_doc'],
    followers: await Follow.find({ followed: foundProfile['_doc']['_id'] }),
    following: await Follow.find({ following: foundProfile['_doc']['_id'] }),
  };

  next();
};

export default checkProfile;
