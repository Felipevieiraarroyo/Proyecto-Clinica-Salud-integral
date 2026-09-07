import type { Request, Response } from "express";

import {
  createAppointment,
  getDoctorAgenda,
  updateAppointmentStatus,
} from "../models/appointment.model.js";

import { getPatientById } from "../models/paciente.model.js";
import { getDoctorById } from "../models/doctor.model.js";

export async function createAppointmentController(
  req: Request,
  res: Response
) {
  try {
    const { pacienteId, medicoId, fechaHora } = req.body;

    const patient = await getPatientById(Number(pacienteId));

    if (!patient) {
      return res.status(404).json({
        error: "Paciente no encontrado",
      });
    }

    const doctor = await getDoctorById(Number(medicoId));

    if (!doctor) {
      return res.status(404).json({
        error: "Médico no encontrado",
      });
    }

    const appointment = await createAppointment({
      pacienteId: Number(pacienteId),
      medicoId: Number(medicoId),
      fechaHora: new Date(fechaHora),
    });

    return res.status(201).json(appointment);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al crear la cita",
    });
  }
}

export async function getDoctorAgendaController(
  req: Request,
  res: Response
) {
  try {
    const medicoId = Number(req.params.id);

    const { from, to } = req.query;

    let fromDate: Date | undefined;
    let toDate: Date | undefined;

    if (from && to) {
      fromDate = new Date(String(from));
      toDate = new Date(String(to));
    }

    const appointments = await getDoctorAgenda(
      medicoId,
      fromDate,
      toDate
    );

    return res.json(appointments);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al obtener la agenda del médico",
    });
  }
}
export async function updateAppointmentStatusController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const { estado } = req.body;

    const appointment = await updateAppointmentStatus(id, estado);

    return res.json(appointment);
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      error: "Cita no encontrada",
    });
  }
}