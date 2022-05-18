import _ from 'lodash'
import { Router } from 'express';
import workorders from "./model.js";
import users from "../users/model.js";
import validateJWT from "../../services/jwt/index.js";

const router = new Router();

router.post("/add", async function (request, response) {

    try{
        await workorders.create(request.body);      
        return response.sendStatus(201);
    }catch(e){

        return response.status(406).send(message);
    }
  });

router.get("/all", validateJWT, async function (request, response){
    try {
        const allWorkorders = await workorders.find().populate("users");
        return response.send(allWorkorders);
    } catch (error) {
        return response.sendStatus(406);
    }
    
});

router.get("/:id", validateJWT, async function (request, response){
    try {
        const workorder = await workorders.findById(request.params.id).populate("users");
        return response.send(workorder);
    } catch (error) {
        return response.sendStatus(406);
    }
    
});

router.delete("/delete/:id", validateJWT, async function (request, response){

    try {
        const admin = await users.findOne({email: request.user.email});
        if (admin.role.includes("Admin")){
            const user = await users.find({workorders: request.params.id});
            user.map(async (u, i)=>{u.workorders.splice(i, 1); await u.save();});

            const workorder = await workorders.deleteOne({_id: request.params.id});
            return response.send(workorder);
        }else{
            return response.sendStatus(408);
        }
    } catch (error) {
        return response.sensStatus(406);
    }
    
});

router.put("/update/:id", validateJWT, async function (request, response){

    try {
        const admin = await users.findOne({email: request.user.email});
        if (admin.role.includes("Admin")){
            const workorder = await workorders.findById(request.params.id);
            await workorder.set(request.body);
            await workorder.save();
            return response.sendStatus(200);
        }else{
            return response.sendStatus(408);
        }
    } catch (error) {
        return response.sendStatus(406);
    }
    
});

export default router;