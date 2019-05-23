import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import Person from '../models/Person';

dotenv.config();

/**
 * Contains the authentification routes
 *
 * @class Auth
 */
class AuthController {
  /**
   * Checks whether the user exists,
   * if not, a new one is created,
   * else the same user is returned
   *
   * @static
   * @param {*} res
   * @param {*} providerUser
   * @returns {object} user
   * @memberof User
   */
  static async findOrCreate(res, providerUser) {
    const {
      id,
      email,
      picture,
      displayName,
      name,
    } = AuthController.fromProvider(providerUser);

    const getUser = userId =>
      Person.findById(userId)
        .populate('user')
        .exec();

    const username = displayName.replace(/\s+/g, '') + id.substr(0, 5);
    const token = jwt.sign({ email, username }, process.env.SECRET, {
      expiresIn: '2d',
    });

    const exist = await Person.findOne().or([{ providerId: id }, { email }]);

    if (exist == null) {
      const user = await User.create({
        username,
        email,
        picture,
      });

      const { givenName, familyName } = name;

      const person = await Person.create({
        providerId: id,
        firstName: givenName,
        lastName: familyName,
        user: user.id,
      });

      const result = await getUser(person.id);

      return res.status(201).json({
        user: result,
        token,
      });
    }

    const result = await getUser(exist.id);

    return res.status(200).json({
      user: result,
      token,
    });
  }

  /**
   * Authentificate the user
   * from social login
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof Auth
   * @return {void}
   */
  static async socialAuth(req, res) {
    await AuthController.findOrCreate(res, req.user);
  }

  /**
   * Adds different fields to the user
   *
   * @static
   * @param {*} user
   * @returns {object} user
   * @memberof Auth
   */
  static fromProvider(user) {
    return {
      ...user,
      name: user.name || { givenName: null, familyName: null },
      email: user.emails ? user.emails[0].value : null,
      picture: user.photos[0].value,
    };
  }
}

export default AuthController;
