import checkAuth from './checkAuth';

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization !== 'undefined') {
    checkAuth(req, res, next);
    return;
  }

  next();
};
