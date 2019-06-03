import 'dotenv/config';
import webPush from 'web-push';
import q from 'q';
import { PushSubscriber } from '../models';
import { statusCodes, responseMessages } from '../constants';
import logger from '../helpers/logger';

const {
  APP_NAME,
  APP_SLOGAN,
  APP_LOGO,
  FRONTEND_URL,
  PUSH_PUBLIC_VAPID_KEY,
  PUSH_PRIVATE_VAPID_KEY,
} = process.env;

/**
 * @description WebPushController Controller class
 */
export default class WebPushController {
  /**
   * @author Olivier
   * @param {Object} payload
   * @param {Object} users
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async pushNotifications({ payload, users } = {}) {
    const defaultPayload = {
      title: APP_NAME,
      message: APP_SLOGAN,
      url: FRONTEND_URL,
      icon: APP_LOGO,
    };
    const pushPayload = JSON.stringify({ ...defaultPayload, ...payload });
    const pushOptions = {
      vapidDetails: {
        subject: FRONTEND_URL,
        privateKey: PUSH_PRIVATE_VAPID_KEY,
        publicKey: PUSH_PUBLIC_VAPID_KEY,
      },
      headers: {},
    };

    const parallelSubscriptionCalls = users.map(user => {
      return new Promise(async (resolve, reject) => {
        const mobSubscriber = await PushSubscriber.find({
          user: user._id,
          platform: 'mobile',
        });
        const webSubscriber = await PushSubscriber.find({
          user: user._id,
          platform: 'mobile',
        });
        if (mobSubscriber) {
          const pushSubscription = {
            endpoint: mobSubscriber.endpoint,
            keys: {
              p256dh: mobSubscriber.keys.p256dh,
              auth: mobSubscriber.keys.auth,
            },
          };
          webPush
            .sendNotification(pushSubscription, pushPayload, pushOptions)
            .then(value => {
              resolve({
                status: true,
                endpoint: mobSubscriber.endpoint,
                data: value,
              });
            })
            .catch(err => {
              reject({
                status: false,
                endpoint: mobSubscriber.endpoint,
                data: err,
              });
            });
        }

        if (webSubscriber) {
          const pushSubscription = {
            endpoint: webSubscriber.endpoint,
            keys: {
              p256dh: webSubscriber.keys.p256dh,
              auth: webSubscriber.keys.auth,
            },
          };
          webPush
            .sendNotification(pushSubscription, pushPayload, pushOptions)
            .then(value => {
              resolve({
                status: true,
                endpoint: webSubscriber.endpoint,
                data: value,
              });
            })
            .catch(err => {
              reject({
                status: false,
                endpoint: webSubscriber.endpoint,
                data: err,
              });
            });
        }
      });
    });

    q.allSettled(parallelSubscriptionCalls).then(pushResults => {
      logger.info(pushResults);
    });
  }

  /**
   * @author Olivier
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} Returns the response
   */
  static async subscribe(req, res) {
    const {
      body,
      currentUser: { _id: user },
    } = req;
    body.user = user;
    await PushSubscriber.save(body);

    res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: responseMessages.created('Subscription'),
    });
  }
}
