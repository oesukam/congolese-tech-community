/**
 * 
 */

import { Types } from 'mongoose';
import User from '../models/User';
import Follow from '../models/Follow';
import { PAGE_LIMIT } from '../constants/shared';

// eslint-disable-next-line require-jsdoc
export default class ProfileService {
  /**
   * Profile Service
   * @param {*} userModel 
   * @param {*} followModel 
   */
  constructor(userModel = User, followModel = Follow) {
    this.userModel = userModel;
    this.followModel = followModel;
  }

  /**
   * 
   * @param {*} username - the username
   * @returns {object} - The requested profile
   */
  async getCompleteProfile (username) {
    const foundProfile = await this.userModel.findOne({
      username,
      status: { $ne: 'deleted' },
    })
      .select(['-status', '-createdAt', '-updatedAt', '-password'])
      .populate('info', '-__v');
  
      return foundProfile;
  }

  /**
   * @author nkpremices
   * @param {string} id
   * @param {string} field 
   * @param {string} match 
   * @param {number} page
   * @returns {object} - the retrieved list
   * 
   */
  async getFollowersFollowing(id, field = 'follower', match = 'followed', page = 1) {
    const data = await this.followModel.aggregate([
      {
        $lookup:
        {
          from: "users",
          localField: field,
          foreignField: "_id",
          as: "user"
        }
      },
      { $match: { [match]: Types.ObjectId(id) } },
      { $limit: PAGE_LIMIT },
      { $skip: PAGE_LIMIT * (page - 1) }
    ]);

    return data;
  }
}

export const profileService = new ProfileService();
