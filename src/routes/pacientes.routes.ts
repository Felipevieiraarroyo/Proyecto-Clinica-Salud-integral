import { Router, type IRouter } from "express";
import {
  createPatientController,
  getPatientsController,
  getPatientByIdController,
  updatePatientController,
  deletePatientController,
} from "../controllers/paciente.controller.js";
import { validatePatient } from "../middlewares/validar-paciente.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router: IRouter = Router();

router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validatePatient,
  createPatientController,
);

router.get("/", verifyToken, authorize("RECEPCIONISTA"), getPatientsController);

router.get("/:id", getPatientByIdController);

router.put(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validatePatient,
  updatePatientController,
);

router.delete(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA"),
  deletePatientController,
);

export default router;
