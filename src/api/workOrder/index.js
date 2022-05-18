import { Router } from "express";
import { validateJWT } from "../../services/jwt/index.js";
import WorkOrder from "./model.js";
import User from "../user/model.js";
import {doYouPartecipateToWork, verifyIfHavePermission} from "../user/permission/index.js";

const router = new Router();

//get all work
router.get("/", validateJWT,async (req, res) => {
    if(await verifyIfHavePermission(req.user.id)){
        return res.json(await WorkOrder.find({}).populate("user", "name email role"));
    }
    else{
        return res.sendStatus(401);
    }
});

//get work by id
router.get("/:id", validateJWT, async (req, res) => {
    if(await doYouPartecipateToWork(req.user.id, req.params.id) || await verifyIfHavePermission(req.user.id)){
        const foundWork = await WorkOrder.findOne({ _id: req.params.id }).populate("user", "name email role");
        return foundWork ? res.json(foundWork) : res.sendStatus(404);
    }
    else{
        return res.sendStatus(401);
    }
});

//insert new work
router.post("/", validateJWT, async (req, res) => {
    try {
        return await verifyIfHavePermission(req.user.id) ? res.json(await WorkOrder.create(req.body)) : res.sendStatus(401);
    } catch (e) {
        console.log({ errorPostWork: e });
    }
});

//modify work by id
router.put("/:id", validateJWT, async (req, res) => {

    if(await verifyIfHavePermission(req.user.id)) {
        const foundWork = await WorkOrder.findOne({ _id: req.params.id });
        if (foundWork) {
            foundWork.set(req.body);
            await foundWork.save();
        }
        return foundWork ? res.json(foundWork) : res.sendStatus(404);
    }
    else{
        res.sendStatus(401);
    }


});

//delete work by id
router.delete("/:id", validateJWT, async (req, res) => {

    if(await verifyIfHavePermission(req.user.id)){

        const userWhoPartecipateToWork = await User.find({workOrder:req.params.id});


        userWhoPartecipateToWork.map((currentUser)=>{
            const index = currentUser.workOrder.indexOf(req.params.id);
            if (index > -1) {
                currentUser.workOrder.splice(index, 1); // 2nd parameter means remove one item only
            }
            currentUser.save();
        })


        const result = await WorkOrder.deleteOne({ _id: req.params.id });
        return result.deletedCount > 0 ? res.sendStatus(204) : res.sendStatus(404);
    }
    else{
        return res.sendStatus(401);
    }
});

export default router;
