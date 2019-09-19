import { Post } from '../models';
import { statusCodes } from '../constants';

/**
 * @description Feed Controller class
 */
export default class FeedController {
  /**
   * Get all feed
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {void} feed
   * @memberof FeedController
   */
  static async getFeed(req, res) {
    const { offset = 0, limit = 20 } = req.query;

    const feed = await Post.find({})
      .select('-__v')
      .populate('author', '-_id -__v -password')
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      feed,
    });
  }

  /**
   * Get organization feed
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {void} feed
   * @memberof FeedController
   */
  static async getOrganizations(req, res) {
    const { offset = 0, limit = 20 } = req.query;

    const feed = await Post.find({ userType: 'organization' })
      .select('-__v')
      .populate('author', '-_id -__v -password')
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      feed,
    });
  }
}
