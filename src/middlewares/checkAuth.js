import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User, Token } from '../models';

const { JWT_SECRET } = process.env;

const checkAuth = async (req, res, next) => {
  let user;

  if (!req.headers) {
    return res
      .status(401)
      .json({ status: 401, message: 'Unauthorized access' });
  }

  const { authorization = '' } = req.headers;
  const token = authorization.slice(7);
  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: 'Unauthorized access' });
  }
  // Checks if the token exist in the database
  const foundToken = await Token.findOne({
    token,
  });

  if (!foundToken) {
    return res
      .status(401)
      .json({ status: 401, message: 'Authentication required. Please login' });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err || !decoded) {
      return res
        .status(401)
        .json({ status: 401, message: 'Unauthorized access' });
    }
    user = await User.findOne(
      {
        _id: decoded._id,
      },
      { password: 0 },
    );
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: 'Unauthorized access' });
    }
    req.currentUser = user;
    next();
  });
};

export default checkAuth;
