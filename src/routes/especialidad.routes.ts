import { Router, type IRouter } from "express";
import { getEspecialidades } from "../controllers/especialidad.controller.js";

const router: IRouter = Router();

router.get("/", getEspecialidades);

export default router;