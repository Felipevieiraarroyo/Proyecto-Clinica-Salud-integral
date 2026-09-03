import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getDoctorsController } from "../controllers/doctor.controller.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  getDoctorsController
);

export default router;