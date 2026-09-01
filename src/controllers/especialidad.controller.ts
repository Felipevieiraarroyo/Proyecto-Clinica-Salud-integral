import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function getEspecialidades(
  req: Request,
  res: Response
) {
  try {
    const especialidades = await prisma.especialidad.findMany();

    res.json(especialidades);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener las especialidades",
    });
  }
}