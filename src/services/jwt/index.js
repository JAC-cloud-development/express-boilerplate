import jwt from 'jsonwebtoken'
import _ from 'lodash'
import Users from '../../api/users/model.js'

export default async function validateJWT(request, response, next) {
    try {
        var decoded = jwt.verify(request.headers.authorization.split(" ")[1], 'secret');
        const user = await Users.findOne({ _id: decoded.user.id.toString() });
        console.log({ user })
        if (user) {
            request.user = user;
            next();
        } else {
            response.sendStatus(401)
        }
    } catch (e) {
        console.error(e)
        response.sendStatus(401)
    }
}