import _ from 'lodash'
import { Router } from 'express';
import users from "../users/model.js";
import workorders from "../workorders/model.js";
import validateJWT from "../../services/jwt/index.js";

const router = new Router();

router.put("/:idUser/:idWorkorder", async function (request, response) {

    try{
        const user = await users.findById(request.params.idUser);
        const workorder = await workorders.findById(request.params.idWorkorder);
        
        user.workorders.push(workorder._id);
        workorder.users.push(user._id);

        await user.save();
        await workorder.save();

        return response.sendStatus(201);
    }catch(e){
        return response.sendStatus(406);
        
    }
  });

  router.put("/remove/:idUser/:idWorkorder", async function (request, response) {

    try{
        const user = await users.findById(request.params.idUser);
        const workorder = await workorders.findById(request.params.idWorkorder);

        const userIndex = workorder.users.indexOf(user._id);
        const workorderIndex = user.workorders.indexOf(workorder._id);

        user.workorders.splice(workorderIndex, 1);
        workorder.users.splice(userIndex, 1);

        await user.save();
        await workorder.save();

        return response.sendStatus(201);
    }catch(e){
        return response.sendStatus(406);
        
    }
  });

export default router;