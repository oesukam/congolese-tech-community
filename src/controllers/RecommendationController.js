import { Recommendation } from '../models';
import { statusCodes, responseMessages } from '../constants';

/**
 * @description Re Controller class
 */
export default class RecommendationController {

    /**
     * Recommend a user
     *
     * @static
     * @param {*} req
     * @param {*} res
     * @returns {object} recommendation
     * @memberof RecommendationController
     */
    static async recommend(req, res) {
        const { currentUser, receiver } = req;
        const { description } = req.body;

        if (currentUser._id.toString() === receiver.id) {
            return res.status(statusCodes.FORBIDDEN).json({
                status: statusCodes.FORBIDDEN,
                message: responseMessages.notAllowed('You are', 'recommend yourself'),
            });
        }

        const recommendation = await Recommendation.create({
            from: currentUser._id,
            to: receiver.id,
            description,
        });

        return res.status(statusCodes.OK).json({
            status: statusCodes.OK,
            recommendation
        });

    }

}