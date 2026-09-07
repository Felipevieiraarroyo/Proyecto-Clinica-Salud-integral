import { Router, type IRouter } from "express";

import {
  createAppointmentController,
  getDoctorAgendaController,
  updateAppointmentStatusController,
} from "../controllers/appointment.controller.js";

import {
  validateAppointment,
  validateAppointmentStatus,
} from "../middlewares/validate-appointment.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router: IRouter = Router();

router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validateAppointment,
  createAppointmentController
);
router.patch(
  "/:id/status",
  verifyToken,
  authorize("MEDICO"),
  validateAppointmentStatus,
  updateAppointmentStatusController
);

router.get(
  "/doctors/:id/appointments",
  verifyToken,
  authorize("MEDICO"),
  getDoctorAgendaController
);

export default router;