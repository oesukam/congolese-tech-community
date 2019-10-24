import moment from 'moment-timezone';

const defaultDateTime = () => moment
  .tz(Date.now(), 'Africa/Kinshasa')
  .format();

export default defaultDateTime;