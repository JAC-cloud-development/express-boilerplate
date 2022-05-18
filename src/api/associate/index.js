import { Router } from "express";
import { validateJWT } from "../../services/jwt/index.js";
import User from "../user/model.js";
import WorkOrder from "../workOrder/model.js";
import {verifyIfHavePermission, verifyIfHavePermissionStandard} from "../user/permission/index.js";

const router = new Router();

//associate user to workOrder
//bisogna essere utenti admin, tramite il jwt parte la verifica dei permessi e se passata con successo viene preso
//l'id dello user e inserito nel work
router.post("/:userid/:workid", validateJWT, async (req, res) => {
    try{
        if(await verifyIfHavePermission(req.user.id)){
            const foundUser = await User.findById(req.params.userid);
            const foundWork = await WorkOrder.findById(req.params.workid);
            if(foundUser && foundWork){
                if(!foundWork.user.includes(req.params.userid) && !foundUser.workOrder.includes(req.params.workid)){
                    foundWork.user.push(req.params.userid);
                    foundUser.workOrder.push(req.params.workid);

                    await foundUser.save();
                    await foundWork.save();
                    return res.sendStatus(200);
                }
                else{
                    return res.sendStatus(409)
                }
            }
            else{
                return res.sendStatus(404);
            }

        }
        else{
            return res.sendStatus(401);
        }
    }
    catch(e){
        console.log({errorAssociateUsertoWork: e});
        return [];
    }
});

//elimina il collegamento tra utente e commessa
//tramite il jwt verifica che l'utente abbia i permessi poi prende i due id e li cancella
router.put("/:userid/:workid", validateJWT, async (req, res) => {
    try{
        if(await verifyIfHavePermission(req.user.id)){
            const foundUser = await User.findById(req.params.userid);
            const foundWork = await WorkOrder.findById(req.params.workid);
            if(foundUser && foundWork){
                if(foundWork.user.includes(req.params.userid) && foundUser.workOrder.includes(req.params.workid)){


                    const index = foundWork.user.indexOf(req.params.userid);
                    if (index > -1) {
                        foundWork.user.splice(index, 1); // 2nd parameter means remove one item only
                    }

                    const index2 = foundUser.workOrder.indexOf(req.params.workid);
                    if (index2 > -1) {
                        foundUser.workOrder.splice(index, 1); // 2nd parameter means remove one item only
                    }

                    await foundUser.save();
                    await foundWork.save();
                    return res.sendStatus(200);
                }
                else{
                    return res.sendStatus(409)
                }
            }
            else{
                return res.sendStatus(404);
            }

        }
        else{
            return res.sendStatus(401);
        }
    }
    catch(e){
        console.log({errorRemoveUsertoWork: e});
        return [];
    }
});

//dato lo userId estrae tutte le commesse a cui è associato
// solo se il ruolo è admin del token
router.get("/user/:userid", validateJWT, async (req, res) => {
    try{
        if(await verifyIfHavePermission(req.user.id)){
            const foundWork = await WorkOrder.find({user: req.params.userid});
            return foundWork ? res.json(foundWork) : res.sendStatus(404);
            }
        else{
            return res.sendStatus(401);
        }
    }
    catch(e){
        console.log({errorRemoveUsertoWork: e});
        return [];
    }
});

//un endpoint che data la commessa estrae tutti gli user associati
// solo se il ruolo dello user associato al token è admin
router.get("/work/:workid", validateJWT, async (req, res) => {
    try{
        if(await verifyIfHavePermission(req.user.id)){
            const foundUser = await User.find({workOrder: req.params.workid});
            return foundUser ? res.json(foundUser) : res.sendStatus(404);
        }
        else{
            return res.sendStatus(401);
        }
    }
    catch(e){
        console.log({errorRemoveUsertoWork: e});
        return [];
    }
});


//un endpoint che se il token ha associato uno user di tipo "backend o frontend o admin"
// gli restituisce tutte le commesse a cui è associato
router.get("/", validateJWT, async (req, res) => {
    try{
        if(await verifyIfHavePermissionStandard(req.user.id)){
            const foundWorkOfThatStandardUser = await WorkOrder.find({user: req.user.id});
            return foundWorkOfThatStandardUser ? res.json(foundWorkOfThatStandardUser) : res.sendStatus(404);
        }
        else{
            return res.sendStatus(401);
        }
    }
    catch(e){
        console.log({errorRemoveUsertoWork: e});
        return [];
    }
});


export default router;
