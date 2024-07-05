const {verifyToken} = require('./../utils/tokenUtils')

/*
    - Check & Verify Attached JWT Token
    - Attach Decoded User to the Req object
*/
exports.authenticate = (req, res, next) => {
    try {
        // Parse Token from cookie [bearer]
        const headerAuth = req.headers["authorization"];
        
        if (!headerAuth) throw new Error("UNAUTHORIZED! Token Not Found!");
        
        const token = headerAuth.split(" ")[1];
        
        req.user = verifyToken(token);

    } catch (err) {
        return next(err);
    }
    next();
};

/*
    - Make sure that the decoded user in the req have at least one of the allowed roles 
*/
exports.authorize = (allowedRoles) => {
    return (req, res, next) => {
        // Make sure user Authenticated and have roles
        if (!req.user || !Array.isArray(req.user.roles)) return next(new Error("Access Denied: Not Authorized"));

        // Make sure that authenticated user is allowed
        const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));

        if (!hasRole) return next(new Error("Access Denied: Not Authorized"));

        next();
    };
};
