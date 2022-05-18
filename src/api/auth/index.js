// require the express module
import _ from 'lodash'
import { Router } from 'express';
import jwt from 'jsonwebtoken'
import Users from '../users/model.js'
const router = new Router();

router.post("/login", async function (request, response, next) {
  try {console.log('-----------------------------------------------------')
  
    const decoded = Buffer.from(request.headers.authorization.split(" ")[1], 'base64').toString('binary')
    
    const username = decoded.split(":")[0]
    console.log(username)
    const password = decoded.split(":")[1]
    console.log('/"'+password+'/"')
    const user = await Users.findOne({ username: username })
    console.log(user)
    if (user && user.checkPassword(password)) {
      const token = jwt.sign({
        user: { id: user.id }
      }, 'secret');
      return response.json({
        token
      })
    }
    return response.sendStatus(401)
  } catch (e) {
    next(e)
  }
});

export default router;