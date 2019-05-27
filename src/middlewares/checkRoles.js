import * as statusCodes from '../constants/statusCodes';
import { unauthorized } from '../constants/responseMessages';

const checkRoles = (roles = []) => {
  return async (req, res, next) => {
    const user = req.currentUser.toObject();
    if (!roles.includes(user.userType)) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: statusCodes.UNAUTHORIZED,
        message: unauthorized(),
      });
    }

    next();
  };
};

export default checkRoles;
