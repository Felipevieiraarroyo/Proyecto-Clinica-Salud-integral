import { prisma } from "../prisma.js";

export interface DadosPaciente {
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  telefono: string;
  email: string;
}

export function createPatient(data: DadosPaciente) {
  return prisma.paciente.create({
    data,
  });
}

export function getAllPatients() {
  return prisma.paciente.findMany();
}

export function getPatientById(id: number) {
  return prisma.paciente.findUnique({
    where: { id },
  });
}

export function updatePatient(id: number, data: DadosPaciente) {
  return prisma.paciente.update({
    where: { id },
    data,
  });
}

export function deletePatient(id: number) {
  return prisma.paciente.delete({
    where: { id },
  });
}
