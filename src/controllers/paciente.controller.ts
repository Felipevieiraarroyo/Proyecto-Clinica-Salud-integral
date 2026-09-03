import type { Request, Response } from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
} from "../models/paciente.model.js";

export async function createPatientController(
  req: Request,
  res: Response
) {
  try {
    const patient = await createPatient(req.body);

    res.status(201).json(patient);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear el paciente",
    });
  }
}

export async function getPatientsController(
  req: Request,
  res: Response
) {
  try {
    const patients = await getAllPatients();

    res.json(patients);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener los pacientes",
    });
  }
}

export async function getPatientByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    const patient = await getPatientById(id);

    if (!patient) {
      return res.status(404).json({
        error: "Paciente no encontrado",
      });
    }

    res.json(patient);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el paciente",
    });
  }
}