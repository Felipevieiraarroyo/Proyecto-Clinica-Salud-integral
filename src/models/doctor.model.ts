import { prisma } from "../prisma.js";

export function getAllDoctors(specialtyName?: string) {
  const where = specialtyName
    ? {
        especialidad: {
          nombre: {
            equals: specialtyName,
            mode: "insensitive" as const,
          },
        },
      }
    : {};

  return prisma.medico.findMany({
    where,
    include: {
      especialidad: true,
    },
  });
}