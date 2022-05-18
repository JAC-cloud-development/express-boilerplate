async function controlObjectId(req, res, next) {
    var ObjectId = req.params.ObjectId;
    return ObjectId.length === 24 ? next() : res.status(404).send("ObjectId must be 12-bytes or 24-bityes.");
}

async function controlDoubleObjectID(req, res, next) {
    var ObjectIdUser = req.body.ObjectIdUser;
    var ObjectIdTask = req.body.ObjectIdTask;
    return ObjectIdUser.length === 24 &&  ObjectIdTask.length === 24? next() : res.status(404).send("ObjectId must be 12-bytes or 24-bityes.");
}
export {controlObjectId, controlDoubleObjectID};