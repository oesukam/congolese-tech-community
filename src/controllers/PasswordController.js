import dotenv from 'dotenv';
import User from '../models/User';
import { encrypt } from '../helpers';
import { resetPasswordMail } from '../helpers/sendMail';
import { resetPasswordEmail, updated } from '../constants/responseMessages';
// import Organization from '../models/Organization';
import { OK, BAD_REQUEST } from '../constants/statusCodes';

dotenv.config();

/**
 * Contains the passeord controllers
 *
 * @class PasswordController
 */
class PasswordController {
  /**
   * send password reset link
   *
   * @author Karl Musingo
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} res
   * @memberof PasswordController
   */
  static async reset(req, res) {
    const { _id, email, username } = req.currentUser;
    const token = await encrypt.generateToken(_id);

    resetPasswordMail(email, username, token);

    return res.status(OK).json({
      status: OK,
      message: resetPasswordEmail('Reset Password email'),
      data: { email, token },
    });
  }

  /**
   * update password
   *
   * @author Karl Musingo
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} res
   * @memberof PasswordController
   */
  static async update(req, res) {
    const { password } = req.body;
    const { password: currentPassword, _id } = req.currentUser;
    const hashedPassword = encrypt.hashPassword(password);

    if (encrypt.comparePassword(currentPassword, password)) {
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: 'New password must be different from the current',
      });
    }

    await User.updateOne({ _id }, { password: hashedPassword });

    return res.status(OK).json({
      status: OK,
      message: updated('Password'),
    });
  }
}

export default PasswordController;
