import { Router, type IRouter } from "express";
import { getDoctorsController } from "../controllers/doctor.controller.js";

const router: IRouter = Router();

router.get("/", getDoctorsController);

export default router;