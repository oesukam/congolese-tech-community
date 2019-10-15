import { User } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const checkUserFromParams = async (req, res, next) => {
  let user;
  const { username } = req.params;

  if (username) {
    user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        status: statusCodes.NOT_FOUND,
        message: notExist('User'),
      });
    }
    
    req.currentUser = user;
    next();
  }
  
};

export default checkUserFromParams;