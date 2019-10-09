import { User } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { alreadyExist } from '../constants/responseMessages';

const checkUser = async (req, res, next) => {
  
  const { email, username } = req.body;

  const ret = field =>
    res
      .status(statusCodes.CONFLICT)
      .json({ status: statusCodes.CONFLICT, message: alreadyExist(field) });

  const existUsername = await User.findOne({
    username,
  });
  const existEmail = await User.findOne({
    email,
  });

  if (existUsername) return ret('Username');
  if (existEmail) return ret('Email');

  next();
};

export default checkUser;
