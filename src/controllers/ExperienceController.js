import { Person, PersonExperience } from '../models';
import { statusCodes, responseMessages } from '../constants';

/**
 * @description Experience Controller class
 */
export default class ExperienceController {
  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async createExperience(req, res) {
    const { currentUser, body } = req;
    body.user = currentUser._id;
    const experience = await PersonExperience.create(body);

    await Person.updateOne(
      { user: currentUser._id },
      { $push: { experiences: experience._id } },
    );

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      experience,
      message: responseMessages.created('Experience'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async updateExperience(req, res) {
    const { currentUser, body, personExperience } = req;

    if (!currentUser._id.equals(personExperience.user)) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: statusCodes.UNAUTHORIZED,
        message: responseMessages.unauthorized(),
      });
    }

    await personExperience.updateOne(body);

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      personExperience: {
        ...personExperience.toObject(),
        ...body,
      },
      message: responseMessages.updated('Experience'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async deleteExperience(req, res) {
    const { currentUser, body, personExperience } = req;

    if (!currentUser._id.equals(personExperience.user)) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: statusCodes.UNAUTHORIZED,
        message: responseMessages.unauthorized(),
      });
    }

    await personExperience.deleteOne();

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      personExperience: {
        ...personExperience.toObject(),
        ...body,
      },
      message: responseMessages.deleted('Experience'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async getAllExperiences(req, res) {
    const {
      currentUser: { _id: user },
    } = req;

    const experiences = await PersonExperience.find({ user });
    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      experiences,
    });
  }
}
