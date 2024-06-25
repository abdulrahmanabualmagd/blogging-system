const { body, validationResult } = require("express-validator");

exports.userRegisterValidationRules = () => [
    body("email").isEmail().withMessage("Email is invalid"),
    body("fullName")
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 3 })
        .withMessage("First name must be between 3 and 15 characters"),
    body("phone")
        .optional()
        .matches(/^[0-9]+$/)
        .withMessage("Phone number must contain only numbers"),
    body("nationalId").notEmpty().withMessage("nationalId is required").isLength({ min: 10, max: 10 }),
];

exports.userLoginValidationRules = () => [
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required").isStrongPassword().withMessage("wrong Pass!"),
];

exports.userResetPassValidationRules = () => [
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Email is invalid"),
];

exports.validateInputs = (req, res, next) => {
    // Get all recorded errors
    const errors = validationResult(req);

    // Check error existence
    if (errors.isEmpty()) {
        return next();
    }

    const recordedErrors = errors.array().map((err) => ({
        param: err.param,
        msg: err.msg,
    }));

    const error = new Error("Input Validation Error");
    error.status = 422;
    error.recordedErrors = recordedErrors;

    next(error);
};
