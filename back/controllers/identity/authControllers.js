const authServices = require("../../services/identity/authService");
const mailer = require("../../services/identity/mailerService");

// Register Account
exports.registerController = async (req, res, next) => {
    try {
        // Create
        const result = await authServices.registerService(req.body);
        
        // Mail token
        // const emailResult = await mailer.emailVerificationMail(result.savedUser.email, result.verificationTokenResult.token);
        res.status(201).json({ result, emailResult });
    } catch (err) {
        next(err);
    }
};

// Activate Account
exports.activateAccountController = async (req, res, next) => {
    try {
        // Verify Token
        const result = await authServices.activateAccountService(req.body.token);
        res.status(200).json({ result });
    } catch (err) {
        next(err);
    }
};

// Login Account
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check Data
        if (!email || !password) throw new Error("Missing required fields");
        const token = await authServices.loginService({ email, password });
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};

// Modify nameing of the comming

// Reset Password
exports.resetPasswordGetTokenController = async (req, res, next) => {
    try {
        // Get Token for User
        const token = await authServices.resetPasswordGetTokenService(req, res, next);

        // Send email for user
        await mailer.passwordResetMail(req.body.email, token);

        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};

exports.resetPasswordVerifyTokenController = async (req, res, next) => {
    try {
        const token = await authServices.resetPasswordVerifyTokenService(req, res, next);
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};
