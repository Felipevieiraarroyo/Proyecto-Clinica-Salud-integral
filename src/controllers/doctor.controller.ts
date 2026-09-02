import type { Request, Response } from "express";
import { getAllDoctors } from "../models/doctor.model.js";

export async function getDoctorsController(
  req: Request,
  res: Response
) {
  try {
    const specialty = req.query.specialty;

    const specialtyName =
      typeof specialty === "string" ? specialty : undefined;

    const doctors = await getAllDoctors(specialtyName);

    res.json(doctors);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener los médicos",
    });
  }
}