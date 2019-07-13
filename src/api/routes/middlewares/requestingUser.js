import authMiddlewareUtil from './util/auth';

export default (req, res, next) => {
    return authMiddlewareUtil.middlewareDelegate(req, res, next, 1);
};
