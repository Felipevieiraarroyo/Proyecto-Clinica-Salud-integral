import { prisma } from "../prisma.js";

export function getAppointmentsBySpecialty() {
  return prisma.$queryRaw<
    { specialty: string; total_appointments: number }[]
  >`
    SELECT
      e.nombre AS specialty,
      COUNT(c.id)::int AS total_appointments
    FROM consulta c
    INNER JOIN medico m ON m.id = c."medicoId"
    INNER JOIN especialidad e ON e.id = m."especialidadId"
    GROUP BY e.nombre
    ORDER BY total_appointments DESC
  `;
}
export function getDailyCutoff(startOfDay: Date, endOfDay: Date) {
  return prisma.consulta.groupBy({
    by: ["estado"],
    where: {
      fechaHora: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    _count: {
      estado: true,
    },
  });
}