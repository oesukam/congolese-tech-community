import MobileDetect from 'mobile-detect';

const mobileDetector = (req, res, next) => {
  const md = new MobileDetect(req.headers['user-agent']);
  req.platform = md.mobile() ? 'Mobile' : 'Web';
  next();
};

export default mobileDetector;
