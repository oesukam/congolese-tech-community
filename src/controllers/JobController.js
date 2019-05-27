import { Job } from '../models';
import { statusCodes, responseMessages } from '../constants';

/**
 * @description Job Controller class
 */
export default class JobController {
  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async createJob(req, res) {
    const { currentUser, body } = req;
    const author = {
      username: currentUser.username,
      email: currentUser.email,
      image: currentUser.image,
    };

    const job = await Job.create({ ...body, author: currentUser._id });

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      job: {
        ...job.toObject(),
        author,
        __v: undefined,
      },
      message: responseMessages.created('Job'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async updateJob(req, res) {
    const { currentUser, body, job } = req;

    if (!currentUser._id.equals(job.author._id)) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: statusCodes.UNAUTHORIZED,
        message: responseMessages.unauthorized(),
      });
    }

    await job.updateOne({ ...body });

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      job: { ...job.toObject(), ...body },
      message: responseMessages.updated('Job'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async deleteJob(req, res) {
    const { currentUser, job } = req;

    if (!currentUser._id.equals(job.author._id)) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: statusCodes.UNAUTHORIZED,
        job,
        message: responseMessages.unauthorized(),
      });
    }

    await job.updateOne({ status: 'deleted' });

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      job,
      message: responseMessages.deleted('Job'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async getJob(req, res) {
    const { job } = req;

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      job,
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async getJobs(req, res) {
    const jobs = await Job.find({})
      .select('-__v')
      .populate('author', '-_id -__v -userType -password');

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      jobs,
    });
  }
}
