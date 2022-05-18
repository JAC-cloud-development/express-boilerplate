import jwt from 'jsonwebtoken';
import users from '../../api/users/model.js';
import 'dotenv/config';

export default async function validateJWT(request, response, next) {
    try {
        const decoded = jwt.verify(request.headers.authorization.split(" ")[1], process.env.JWT_KEY);
        //console.log(decoded.user._id);
        const user = await users.findById(decoded.user._id);
        //console.log({ user });
        if (user) {
            request.user = user;
            next();
        } else {
            response.sendStatus(401);
        }
    } catch (e) {
        console.error(e);
        response.sendStatus(401);
    }
}