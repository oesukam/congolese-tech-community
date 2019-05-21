import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Users from '../models/Users';
import Errors from '../helpers/errors';

dotenv.config();

/**
 * Contains the authentification routes
 *
 * @class Auth
 */
class Auth {

    /**
   * Checks whether the user exists,
   * if not, a new one is created,
   * else the same user is returned
   *
   * @static
   * @param {*} res
   * @param {*} user
   * @returns {object} user
   * @memberof User
   */
    static async findOrCreate(res, user) {


        try {
            const {
                id, email, picture, displayName,
            } = user;

            const username = displayName.replace(/\s+/g, '') + id.substr(0, 5);
            const token = jwt.sign({ email, username }, process.env.SECRET, { expiresIn: '2d' });


            const exist = await Users.findOne({ email });

            if (exist == null) {

                const result = await Users.create({
                    username,
                    email,
                    picture,
                    userType: 'Personal'
                });
                return res.status(201).json({
                    status: 201,
                    user: result,
                    token,
                });
            }

            return res.status(200).json({
                status: 200,
                user: exist,
                token,
            });

        } catch (e) {
            Errors.errorResponse(res, e);
        }
        return true;
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
        await Auth.findOrCreate(res, req.user);
    }

}

export default Auth;
