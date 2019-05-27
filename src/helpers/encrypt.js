import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET } = process.env;

/**
 * A helper class to hash password and compare hashed password
 */
class Authentication {
  /**
   * hashPassword Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} returns True or False
   */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * @param  {Object} data
   * @returns  {string}} {expiresIn
   */
  static generateToken(data) {
    const token = jwt.sign(data, SECRET, { expiresIn: '2d' });
    return token;
  }
}

export default Authentication;
