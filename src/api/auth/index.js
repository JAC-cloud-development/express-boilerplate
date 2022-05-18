import _ from 'lodash';
import { Router } from 'express';
import users from "../users/model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import 'dotenv/config';

const router = new Router();

router.post("/", async function (request, response) {
  const decoded = Buffer.from(request.headers.authorization.split(" ")[1], 'base64').toString('binary');
  const username = decoded.split(":")[0];
  const password = decoded.split(":")[1];
  
  const user = await users.findOne({email: username.toLowerCase()});
 
  if (user){
    const match = await bcrypt.compare(password, user.password);

    if (match){
        const token = jwt.sign({
            user: { _id: user._id }
            }, process.env.JWT_KEY);
            return response.json({
            token
            });
    }else{
        console.log("Invalid password");
        return response.sendStatus(401);
    }  
  }else{
    return response.sendStatus(404);
  }
});

export default router;