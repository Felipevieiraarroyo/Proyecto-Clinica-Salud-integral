import { Router } from "express";
import { getDoctorsController } from "../controllers/doctor.controller.js";

const router = Router();

router.get("/", getDoctorsController);

export default router;