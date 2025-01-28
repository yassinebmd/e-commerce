import jwt from "jsonwebtoken";
import 'dotenv/config';
import { userModel } from "../Models/userShema.js";

export const validJWT = (req, res, next) => {
    const authorizationHeader = req.get('authorization');
    
    // Check if the Authorization header is present
    if (!authorizationHeader) {
        return res.status(401).send('Authorization header not found');
    }

    const token = authorizationHeader.split(" ")[1];

    // Check if token is present
    if (!token) {
        return res.status(403).send('Empty token');
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }

        // Check if the payload is missing
        if (!payload) {
            return res.status(403).send('Empty payload');
        }

        try {
            // Find the user in the database using the payload data (email)
            const user = await userModel.findOne({ email: payload.email });

            // If user is not found
            if (!user) {
                return res.status(403).send('User not found');
            }

            // Attach user data to the request object
            req.user = user;

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error("Error finding user:", error);
            return res.status(500).send('Internal server error');
        }
    });
};
