import _ from 'lodash'
import { Router } from 'express';
import users from "./model.js";
import validateJWT from "../../services/jwt/index.js";

const router = new Router();

router.post("/singup", async function (request, response) {

    try{
        await users.create(request.body);      
        return response.sendStatus(201);
    }catch(e){

        let message = "";

        if (e?.keyValue?.email){
            console.log("email already registered");
            message = "email already registered";
        }else if (e?.keyValue?.name){
            console.log("name already in use");
            message = "name already in use";
        }else if (e?.errors?.email){
            console.log(e.errors.email.toString());
            message = e.errors.email.toString();
        }else if (e?.errors?.name){
            console.log(e.errors.name.toString());
            message = e.errors.name.toString();
        }else if (e?.errors?.password){
            console.log(e.errors.password.toString());
            message = e.errors.password.toString();
        }else{
            console.log(e);
        }

        return response.status(406).send(message);
    }
  });

router.get("/all", validateJWT, async function (request, response){
    try {
        const allUsersr = await users.find({},{password:0}).populate("workorders");
        return response.send(allUsersr);
    } catch (error) {
        return response.sendStatus(406);
    }
    
});

router.get("/:id", validateJWT, async function (request, response){
    try {
        const user = await users.findById(request.params.id,{password:0}).populate("workorders");;
        return response.send(user);
    } catch (error) {
        return response.sendStatus(406);
    }
    
});

router.delete("/delete/:id", validateJWT, async function (request, response){

    try {
        const admin = await users.findOne({email: request.user.email});
        if (admin.role.includes("Admin")){
            const user = await users.deleteOne({_id: request.params.id},{password:0});

            return response.send(user);
        }else{
            return response.sendStatus(408);
        }
    } catch (error) {
        return response.sendStatus(406);
    }
    
});

router.put("/update/:id", validateJWT, async function (request, response){

    try {
        const admin = await users.findOne({email: request.user.email});
        if (admin.role.includes("Admin")){
            const user = await users.findById(request.params.id);
            await user.set(request.body);
            await user.save();
            return response.sendStatus(200);
        }else{
            return response.sendStatus(408);
        }
    } catch (error) {
        return response.sendStatus(406);
    }   
    
});

export default router;