const express=require("express");
const controllerComm = require("./controller/appCommController")
const controllerWork = require("./controller/appWorkerController")
const router=express.Router();
router.get("/getAllComm", controllerComm.getAllCommessa)
router.get("/getComm",controllerComm.getSingleCommessa)
router.post("/createComm", controllerComm.createCommessa)
router.delete("/deleteComm",controllerComm.deleteCommessa)
router.put("/updateComm",controllerComm.updateCommessa)
router.get("/getAllWork", controllerWork.getAllWorker)
router.get("/getWork",controllerWork.getSingleWorker)
router.post("/createWork", controllerWork.createWorker)
router.delete("/deleteWork",controllerWork.deleteWorker)
router.put("/updateWork",controllerWork.updateWorker)
module.exports = router