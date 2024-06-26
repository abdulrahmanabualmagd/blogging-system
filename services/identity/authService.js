const { dbApplication } = require("../../config/db");
const { hashPassword, verifyPassword } = require("../../utils/passwordUtils");
const { createToken } = require("../../utils/tokenUtils");
const emailTokensUtils = require("../../utils/emailTokensUtils");

// ------------------------------- [ Register ] -------------------------------

/*
    - Create new user
    - Create email verification token
    - Add role to user
*/
exports.registerService = async (data) => {
    // Init Database
    const db = await dbApplication; // Because all indexes are returning a promise (all are async)

    // Gather all properties from data
    const { username, email, password, firstName, lastName, role } = data;

    // Check any missings
    if ((!username || !email || !password || !firstName || !lastName, !role)) throw Error("Missing Requirements");
    try {
        // Check email duplication
        const emailduplicationResult = await db.User.repo.getOne({ where: { email: email } });
        if (emailduplicationResult) throw new Error("Dublicated Email");

        // create the emailverification token
        const emailVerificationToken = emailTokensUtils.cryptoToken();

        // Hash Password
        const { hashedPassword, salt } = await hashPassword(password);

        // Create User
        const user = new db.User({
            username,
            email: email,
            passwordHash: hashedPassword,
            firstName,
            lastName,
            salt,
        });

        // Add role to user (default:'user')
        const roleResult = await db.Role.repo.getOne({
            where: {
                name: role,
            },
        });

        if (!roleResult) throw Error("Role Not Found");

        // Save the user to Database
        const savedUser = await user.save();

        // Add Role to User
        await db.User.repo.addAssociations(user, roleResult, "Role");

        // Save Verification Token
        const emailVerificationTokenInstance = new db.EmailVerificationToken({
            token: emailVerificationToken,
            userId: user.id,
        });

        const verificationTokenResult = await emailVerificationTokenInstance.save();

        // Return User & Customer
        return { savedUser, role, verificationTokenResult };
    } catch (err) {
        throw err;
    }
};

/*
    - check for email existance
    - check if it's already activated
    - activate account
*/
exports.activateAccountService = async (token) => {
    if (!token) throw Error("Missing Requirements");
    try {
        // Init DB
        const db = await dbApplication;

        // Get Token
        const emailVerificationTokenResult = await db.EmailVerificationToken.repo.getOne({
            where: {
                token: token,
            },
            include: [
                {
                    model: db.User,
                    as: "user",
                },
            ],
        });

        // check the user
        if (!emailVerificationTokenResult) throw Error("Token Not Found");

        // check if the user is already activated his account
        if (
            emailVerificationTokenResult.user.status === "active" ||
            emailVerificationTokenResult.user.status === "suspend"
        )
            throw Error("User Account is Already Activated");

        // check the verifcation code
        if (emailVerificationTokenResult.token !== token) throw Error("Invalid Token");

        // activate account
        emailVerificationTokenResult.user.status = "active";

        emailVerificationTokenResult.user.save();

        // Write login to delete the token after activation

        return { message: "Account Activated Successfully!", emailVerificationTokenResult };
    } catch (err) {
        throw err;
    }
};

// ------------------------------- [ Login ] -------------------------------
/*
    The user Account must be activated to be able to login 
*/
exports.loginService = async (data) => {
    try {
        // Init Database
        const db = await dbApplication; // Because all indexes are returning a promise (all are async)

        // Collect Data
        const { email, password } = data;

        // Get User by Email
        const user = await db.User.repo.getOne({
            where: { email: email },
            include: [
                {
                    model: db.Role,
                    as: "roles",
                },
            ],
        });

        if (!user) throw new Error("User Not Found");

        // check the user status first (must be activa account to be able to log in)
        switch (user.status) {
            case "inactive":
                throw Error("Please Activate Your Account");
            case "suspend":
                throw Error("Your Account Suspended");
        }

        // Hash Password
        if (!(await verifyPassword(password, user.salt, user.passwordHash))) throw new Error("Wrong Password");

        // Prepare All Roles Names
        const roles = [];
        if (user.roles.length > 0) {
            for (let item of user.roles) {
                roles.push(item.name);
            }
        }

        // Prepare Payload
        const payload = {
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            nationalId: user.nationalId,
            roles: roles,
        };

        // Create Token
        const token = createToken(payload);

        return token;
    } catch (err) {
        throw err;
    }
};

// ------------------------------- [ Rest Password (Generate) ] -------------------------------
exports.resetPasswordGetTokenService = async (req, res, next) => {
    try {
        // Init Database
        const db = await dbApplication; // Because all indexes are returning a promise (all are async)

        // Collect Data
        const { email } = req.body;

        if (!email) throw new Error("Missing required Field");

        // Get user
        const user = await db.User.repo.getOne({ where: { email: email } });

        // Check if user exists
        if (!user) throw new Error("Email Not Found");

        // Get user's reset tokens (if it exist, get the most recent to check for timeout)
        const userRecentPasswordResetToken = await db.PasswordResetToken.repo.getOne({
            where: {
                userId: user.id,
            },
            order: [["createdAt", "DESC"]],
        });

        // Check reset token
        if (userRecentPasswordResetToken) {
            // Check availability to create another one if it has passed the specified time
            const result = emailTokensUtils.checkRecentToken(userRecentPasswordResetToken.createdAt);
            if (result > 0)
                throw new Error(`You have to wait ${result / (60 * 1000)} minutes before Generating another token`);
        }

        // Create String Token object
        const passwordResetTokenObject = {
            token: emailTokensUtils.cryptoToken(), // Default Bytes[64]
            userId: user.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * process.env.RESET_PASSWORD_EXPIRATION),
        };

        // Store the token in database
        db.PasswordResetToken.repo.create(passwordResetTokenObject);

        return passwordResetTokenObject.token;
    } catch (err) {
        throw err;
    }
};

// ------------------------------- [ Rest Password (Verify) ] -------------------------------
exports.resetPasswordVerifyTokenService = async (req, res, next) => {
    try {
        // Init Database
        const db = await dbApplication; // Because all indexes are returning a promise (all are async)

        // Collect Data
        const { token } = req.params;
        const { password } = req.body;

        // Check Data
        if (!token || !password) throw new Error("Token or Password not found");

        // Get Token
        const userToken = await db.PasswordResetToken.repo.getOne({
            where: { token: token },
            order: [["createdAt", "DESC"]],
            include: {
                model: db.User,
                as: "User",
            },
        });

        // Check Existance Token
        if (!userToken) throw new Error("Token Not Found");

        // Check Token Expiration
        if (emailTokensUtils.checkExpiration(userToken.expiresAt)) throw new Error("Token Expired");

        // Hash Password
        const { hashedPassword, salt } = await hashPassword(password);

        // Update User Password, Salt, UpdatedAt
        userToken.User.passwordHash = hashedPassword;
        userToken.User.salt = salt;
        userToken.User.updatedAt = Date.now();

        // Save Updated Valued for User
        await userToken.User.save();

        // Destroy Used Token
        userToken.destroy();

        return "Password Updated Successfully!";
    } catch (err) {
        throw err;
    }
};

exports.getAuthenticatedUser = async (decodedToken) => {
    try {
        const db = await dbApplication;

        const { email } = decodedToken;

        if (!email) throw Error("Email not Found");

        const user = await db.User.repo.getOne({
            where: {
                email,
            },
        });

        return user;
    } catch (err) {
        throw Error(err.message);
    }
};
