/*
    Authenticate the request by checking the token from the authorize bearer
    If the token is exist and it's valid then we include the decoded value in [req.user]
    So we check for the user property in the autherize('roleName')
*/
exports.authenticate = (req, res, next) => {
    try {
        // Parse Token from cookie [bearer]
        const headerAuth = req.headers["authorization"];

        if (!headerAuth) throw new Error("Token Not Found!");

        const token = headerAuth.split(" ")[1];

        req.user = verifyToken(token);
    } catch (err) {
        return next(err); // pass the error to the next error-handling middleware (not Reqular middleware(The controller))
    }
    next(); // Continue to the next middleware (Reqular Middleware)
};

exports.authorize = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) throw Error("Access Denied : Not Authoriezed");
        next();
    };
};
