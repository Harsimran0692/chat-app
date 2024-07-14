const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.header.authorization &&
        req.header.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.header.authorization.split(" ")[1];
            console.log("token: ", token);

            // docoding token id
            const decoded = jwt.verify(token, process.env.JWT_Secret);
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }

        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
});

module.exports = { protect };