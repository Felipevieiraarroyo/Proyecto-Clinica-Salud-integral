import { Router, type IRouter } from "express";

import {
  createPatientController,
  getPatientsController,
  getPatientByIdController,
} from "../controllers/paciente.controller.js";

import { validatePatient } from "../middlewares/validar-paciente.js";

const router: IRouter = Router();

router.post("/", validatePatient, createPatientController);

router.get("/", getPatientsController);

router.get("/:id", getPatientByIdController);

export default router;