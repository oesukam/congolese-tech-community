import { Person, PersonProject } from '../models';
import { statusCodes, responseMessages } from '../constants';

/**
 * @description Project Controller class
 */
export default class ProjectController {
  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async createProject(req, res) {
    const { currentUser, body } = req;
    body.user = currentUser._id;
    const project = await PersonProject.create(body);

    await Person.updateOne(
      { user: currentUser._id },
      { $push: { projects: project._id } },
    );

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      project,
      message: responseMessages.created('Project'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async updateProject(req, res) {
    const { currentUser, body, personProject } = req;

    if (!currentUser._id.equals(personProject.user)) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: statusCodes.UNAUTHORIZED,
        message: responseMessages.unauthorized(),
      });
    }

    await personProject.updateOne(body);

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      personProject: {
        ...personProject.toObject(),
        ...body,
      },
      message: responseMessages.updated('Project'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async deleteProject(req, res) {
    const { currentUser, body, personProject } = req;

    if (!currentUser._id.equals(personProject.user)) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: statusCodes.UNAUTHORIZED,
        message: responseMessages.unauthorized(),
      });
    }

    await personProject.deleteOne();

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      personProject: {
        ...personProject.toObject(),
        ...body,
      },
      message: responseMessages.deleted('Project'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async getAllProjects(req, res) {
    const {
      currentUser: { _id: user },
    } = req;

    const projects = await PersonProject.find({ user });
    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      projects,
    });
  }
}
