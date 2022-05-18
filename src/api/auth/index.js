import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../user/model.js";
import { checkPassword } from "../../services/passwordCrypt/index.js";

const router = new Router();

router.post("/login", async function (request, response, next) {
    try {
        const decoded = Buffer.from(
            request.headers.authorization.split(" ")[1],
            "base64"
        ).toString("binary");
        const email = decoded.split(":")[0];
        const password = decoded.split(":")[1];
        const user = await User.findOne({ email: email });
        if (user && (await user.checkPassword(password))) {
            const token = jwt.sign(
                {
                    user: { id: user.id, email: email },
                },
                "secret"
            );
            return response.json({
                token,
            });
        }
        return response.sendStatus(401);
    } catch (e) {
        next(e);
    }
});
export default router;
