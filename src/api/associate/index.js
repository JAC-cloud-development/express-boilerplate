import { Router } from "express";
import { validateJWT } from "../../services/jwt/index.js";
import User from "../user/model.js";
import WorkOrder from "../workOrder/model.js";
import {verifyIfHavePermission} from "../user/permission/index.js";

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
                    foundWork.user.pop(req.params.userid);
                    foundUser.workOrder.pop(req.params.workid);

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


export default router;
