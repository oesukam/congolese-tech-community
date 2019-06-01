import { User } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const checkEmailUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: statusCodes.NOT_FOUND,
      message: notExist('email'),
    });
  }

  req.currentUser = user;
  next();
};

export default checkEmailUser;
