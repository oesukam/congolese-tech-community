import express from 'express';
import { celebrate } from 'celebrate';
import { checkAuth, asyncHandler, userExist } from '../../../middlewares';
import { chatValidator } from './validators';
import { ChatController } from '../../../controllers';

const router = express.Router();

router.route('/:username')
    .post(
        checkAuth,
        userExist,
        celebrate({ body: chatValidator.send }),
        asyncHandler(ChatController.send),
    ).get(
        checkAuth,
        userExist,
        asyncHandler(ChatController.getUserChats),
    );

export default router;
