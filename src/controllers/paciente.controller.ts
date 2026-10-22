import type { Request, Response } from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../models/paciente.model.js";

export async function createPatientController(req: Request, res: Response) {
  try {
    const patient = await createPatient(req.body);
    return res.status(201).json(patient);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al crear el paciente",
    });
  }
}

export async function getPatientsController(req: Request, res: Response) {
  try {
    const patients = await getAllPatients();
    return res.json(patients);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al obtener los pacientes",
    });
  }
}

export async function getPatientByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "ID de paciente inválido",
      });
    }

    const patient = await getPatientById(id);

    if (!patient) {
      return res.status(404).json({
        error: "Paciente no encontrado",
      });
    }

    return res.json(patient);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al obtener el paciente",
    });
  }
}

export async function updatePatientController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "ID de paciente inválido",
      });
    }

    const existingPatient = await getPatientById(id);

    if (!existingPatient) {
      return res.status(404).json({
        error: "Paciente no encontrado",
      });
    }

    const patient = await updatePatient(id, req.body);
    return res.json(patient);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        "Error al actualizar el paciente. Verifica si el correo ya está registrado.",
    });
  }
}

export async function deletePatientController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "ID de paciente inválido",
      });
    }

    const existingPatient = await getPatientById(id);

    if (!existingPatient) {
      return res.status(404).json({
        error: "Paciente no encontrado",
      });
    }

    await deletePatient(id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(409).json({
      error:
        "No se puede eliminar el paciente. Puede tener consultas asociadas.",
    });
  }
}
