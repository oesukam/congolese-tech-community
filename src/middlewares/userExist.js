import { User } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const userExist = async (req, res, next) => {
    const { username } = req.params;

    const user = await User.findOne({
        username,
        status: 'active',
    });

    if (!user) {
        return res.status(statusCodes.NOT_FOUND).json({
            status: statusCodes.NOT_FOUND,
            message: notExist('The user'),
        });
    }

    req.receiver = { id: user.id };

    next();
};

export default userExist;
