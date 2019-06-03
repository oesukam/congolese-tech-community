import 'dotenv/config';
import { EventEmitter } from 'events';

const { NODE_ENV } = process.env;

export const notifEvents = new EventEmitter();

const registerEvents = () => {
  if (NODE_ENV !== 'test') {
    notifEvents.on('post-commented', post => {
      console.log('post-commented', post);
    });
  }
};

export default registerEvents;
