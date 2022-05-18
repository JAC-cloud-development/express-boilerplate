import jwt from "jsonwebtoken";
import User from "../../api/user/model.js";

export async function validateJWT(request, response, next) {
    try {
        let decoded = jwt.verify(
            request.headers.authorization.split(" ")[1],
            "secret"
        );
        const user = await User.findOne({ _id: decoded.user.id });
        if (user) {
            request.user = user;
            console.log("VALIDATION TRUE");
            next();
        } else {
            response.sendStatus(401);
        }
    } catch (e) {
        console.error({ errorAuthentication: e });
        response.sendStatus(401);
    }
}
