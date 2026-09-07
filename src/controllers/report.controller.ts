import type { Request, Response } from "express";
import { z } from "zod";
import {
  getAppointmentsBySpecialty,
  getDailyCutoff,
} from "../models/report.model.js";

export async function getAppointmentsBySpecialtyController(
  req: Request,
  res: Response
) {
  try {
    const report = await getAppointmentsBySpecialty();

    return res.json(report);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al obtener el reporte de citas por especialidad",
    });
  }
}

const dateSchema = z.string().date();

export async function getDailyCutoffController(
  req: Request,
  res: Response
) {
  const result = dateSchema.safeParse(req.query.date);

  if (!result.success) {
    return res.status(400).json({
      error: "La fecha debe tener el formato YYYY-MM-DD",
    });
  }

  const date = result.data;

  const startOfDay = new Date(`${date}T00:00:00`);
  const endOfDay = new Date(`${date}T23:59:59.999`);

  try {
    const report = await getDailyCutoff(startOfDay, endOfDay);

    return res.json(report);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al obtener el corte diario de citas",
    });
  }
}