import { Router, type IRouter } from "express";
import {
  getAppointmentsBySpecialtyController,
  getDailyCutoffController,
} from "../controllers/report.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router: IRouter = Router();

router.get(
  "/appointments-by-specialty",
  verifyToken,
  authorize("GERENCIA"),
  getAppointmentsBySpecialtyController
);
router.get(
  "/daily-cutoff",
  verifyToken,
  authorize("GERENCIA"),
  getDailyCutoffController
);

export default router;