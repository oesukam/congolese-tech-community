import { UserNotification } from '../models';
import { statusCodes, responseMessages } from '../constants';
import { PAGE_LIMIT } from '../constants/shared';

/**
 * @description UserNotification Controller class
 */
export default class UserNotificationController {
  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async createUserNotification(req, res) {
    const { currentUser, body, post } = req;
    body.author = currentUser._id;
    body.post = post._id;
    const userNotification = await UserNotification.create(body);

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      userNotification,
      message: responseMessages.created('Notification'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async readUserNotification(req, res) {
    const { currentUser, userNotification } = req;

    if (!currentUser._id.equals(userNotification.user)) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: statusCodes.UNAUTHORIZED,
        message: responseMessages.unauthorized(),
      });
    }

    await userNotification.updateOne({ read: true });

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      userNotification: {
        ...userNotification.toObject(),
        read: true,
      },
      message: responseMessages.updated('Notification'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async deleteUserNotification(req, res) {
    const { currentUser, userNotification } = req;

    if (!currentUser._id.equals(userNotification.user)) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: statusCodes.UNAUTHORIZED,
        message: responseMessages.unauthorized(),
      });
    }

    await userNotification.deleteOne();

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      userNotification,
      message: responseMessages.deleted('Notification'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async getAllUserNotifications(req, res) {
    const {
      currentUser: { _id: user },
    } = req;
    const { page = 1 } = req.query;

    const notifications = await UserNotification.paginate(
      {
        user,
      },
      {
        limit: PAGE_LIMIT,
        offset: page - 1,
      },
    );

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      ...notifications,
      userNotifications: notifications.docs,
      docs: undefined,
      offset: undefined,
      limit: undefined,
      page,
    });
  }
}
