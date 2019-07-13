export default (f) => {
    return async (req, res, next) => {
        try {
            return await f(req, res, next);
        } catch (e) {
            next(e);
        }
    };
};
