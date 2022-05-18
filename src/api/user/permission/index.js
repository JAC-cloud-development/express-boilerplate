import User from "../model.js";
import WorkOrder from "../../workOrder/model.js";

export const verifyIfHavePermission = async (id) => {
    const foundUser = await User.findById(id);
    return !!foundUser.role.includes("Admin");
}

export const doYouPartecipateToWork = async (userid, workid) => {
    const partecipate = await WorkOrder.findById(workid);
    return !!partecipate.user.includes(userid);
}
