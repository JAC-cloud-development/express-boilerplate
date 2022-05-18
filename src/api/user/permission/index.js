import User from "../model.js";
import WorkOrder from "../../workOrder/model.js";

export const verifyIfHavePermission = async (id) => {
    const foundUser = await User.findById(id);
    return !!foundUser.role.includes("Admin");
}

export const verifyIfHavePermissionStandard = async (id) => {
    const foundUser = await User.findById(id);
    return !!foundUser.role.includes("BackEnd");
}

export const doYouPartecipateToWork = async (userid, workid) => {
    const partecipate = await WorkOrder.findOne({_id:workid});
    if(partecipate){
        return !!partecipate.user.includes(userid);
    }
    else{
        return res.sendStatus(404);
    }
}
