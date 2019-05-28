import { Chat, User } from '../models';
import { statusCodes } from '../constants';

/**
 * Handles chat controllers
 *
 * @export
 * @class ChatController
 */
export default class ChatController {

    /**
     * Sends a message to the receiver
     * 
     * @author Grace Lungu
     * @static
     * @param {*} req
     * @param {*} res
     * @returns {object} chat
     * @memberof ChatController
     */
    static async send(req, res) {
        const { username } = req.params;
        const { body } = req.body;
        const { currentUser } = req;

        const { id } = await User.findOne({ username });

        const chat = Chat.create({
            body,
            sender: currentUser.id,
            receiver: id,
        });

        return res.status(statusCodes.OK).json({
            status: statusCodes.OK,
            chat,
        });

    }

}
