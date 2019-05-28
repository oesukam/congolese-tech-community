import express from 'express';
import { celebrate } from 'celebrate';
import { checkAuth, checkUser, asyncHandler } from '../../../middlewares';
import { chatValidator } from './validators';
import { chatController } from '../../../controllers';

const router = express.Router();

router.route('/:username')
    .post(
        checkAuth,
        checkUser,
        celebrate({ body: chatValidator.send }),
        asyncHandler(chatController.send),
    );

export default router;
