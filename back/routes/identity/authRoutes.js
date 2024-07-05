const router = require("express").Router();
const authControllers = require("../../controllers/identity/authControllers");
const validator = require("../../validators/userValidators");

// Register Account
router.post("/register", authControllers.registerController);

// Activate Account
router.post("/activate", authControllers.activateAccountController);

// Login
router.post("/login", validator.userLoginValidationRules(), validator.validateInputs, authControllers.loginController);
// Reset Get Token
router.post(
    "/reset",
    validator.userResetPassValidationRules(),
    validator.validateInputs,
    authControllers.resetPasswordGetTokenController
);
// Reset Verify Token
router.post("/reset/:token", authControllers.resetPasswordVerifyTokenController);

module.exports = router;
