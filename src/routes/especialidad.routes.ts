import { Router } from "express";
import { getEspecialidades } from "../controllers/especialidad.controller.js";

const router = Router();

router.get("/", getEspecialidades);

export default router;