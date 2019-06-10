import 'dotenv/config';
import { EventEmitter } from 'events';
import PostCommentNotificationController from '../controllers/PostCommentNotificationController';
import { subscribe } from '../config/firebase-admin';

const { NODE_ENV } = process.env;

export const notifEvents = new EventEmitter();

const registerEvents = () => {
  if (NODE_ENV !== 'test') {
    notifEvents.on(
      'post-commented',
      PostCommentNotificationController.postCommented,
    );

    notifEvents.on(
      'register-notification-token',
      ({ notificationToken, currentUser }) => {
        subscribe({ notificationToken, topic: currentUser._id });
      },
    );
  }
};

export default registerEvents;
