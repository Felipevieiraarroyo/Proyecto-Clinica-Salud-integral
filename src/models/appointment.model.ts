import { prisma } from "../prisma.js";

export function createAppointment(data: {
  pacienteId: number;
  medicoId: number;
  fechaHora: Date;
}) {
  return prisma.consulta.create({
    data: {
      ...data,
      estado: "PROGRAMADA",
    },
  });
}

export function getDoctorAgenda(
  medicoId: number,
  from?: Date,
  to?: Date
) {
  return prisma.consulta.findMany({
    where: {
      medicoId,
      ...(from && to
        ? {
            fechaHora: {
              gte: from,
              lte: to,
            },
          }
        : {}),
    },
    include: {
      paciente: true,
    },
    orderBy: {
      fechaHora: "asc",
    },
  });
}

export function updateAppointmentStatus(
  id: number,
  estado: "COMPLETADA" | "CANCELADA"
) {
  return prisma.consulta.update({
    where: { id },
    data: { estado },
  });
}