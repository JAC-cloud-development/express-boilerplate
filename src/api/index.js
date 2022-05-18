import { Router } from "express";
import user from "./user/index.js";
import auth from "./auth/index.js";
import work from "./workOrder/index.js";
import associate from "./associate/index.js";
const router = new Router();

router.use("/user", user);
router.use("/auth",auth);
router.use("/work",work);
router.use("/associate",associate);

export default router;
