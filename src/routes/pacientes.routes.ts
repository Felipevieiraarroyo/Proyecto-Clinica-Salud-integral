import { Router } from "express";
import { authorize } from "../middlewares/authorize.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

import {
  createPatientController,
  getPatientsController,
  getPatientByIdController,
} from "../controllers/paciente.controller.js";

import { validatePatient } from "../middlewares/validar-paciente.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validatePatient,
  createPatientController
);

router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  getPatientsController
);

router.get(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA"),
  getPatientByIdController
);

export default router;