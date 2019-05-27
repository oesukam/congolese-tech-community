import { JobCategory } from '../models';
import { statusCodes, responseMessages } from '../constants';

/**
 * @description JobCategory Controller class
 */
export default class JobCategoryController {
  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async createJobCategory(req, res) {
    const { body } = req;

    const jobCategory = await JobCategory.create(body);

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      jobCategory: {
        ...jobCategory.toObject(),
        __v: undefined,
      },
      message: responseMessages.created('Job Category'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async updateJobCategory(req, res) {
    const { body, jobCategory } = req;

    await jobCategory.updateOne({ ...body });

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      jobCategory: { ...jobCategory.toObject(), ...body },
      message: responseMessages.updated('Job Category'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async deleteJobCategory(req, res) {
    const { jobCategory } = req;
    await jobCategory.deleteOne();

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      jobCategory,
      message: responseMessages.deleted('Job Category'),
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async getJobCategory(req, res) {
    const { jobCategory } = req;

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      jobCategory,
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async getJobAllCategories(req, res) {
    const jobCategories = await JobCategory.find({}).select('-__v');

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      jobCategories,
    });
  }
}
