import express from 'express';
import { celebrate } from 'celebrate';
import { checkAuth, asyncHandler, userExist } from '../../../middlewares';
import { chatValidator } from './validators';
import { chatController } from '../../../controllers';

const router = express.Router();

router.route('/:username')
    .post(
        checkAuth,
        userExist,
        celebrate({ body: chatValidator.send }),
        asyncHandler(chatController.send),
    ).get(
        checkAuth,
        userExist,
        asyncHandler(chatController.getUserChats),
    );

export default router;
