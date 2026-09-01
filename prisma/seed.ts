import "dotenv/config";

import { PrismaClient } from "../src/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Criar especialidades
  const cardiologia = await prisma.especialidad.upsert({
    where: {
      nombre: "Cardiología",
    },
    update: {},
    create: {
      nombre: "Cardiología",
    },
  });

  const pediatria = await prisma.especialidad.upsert({
    where: {
      nombre: "Pediatría",
    },
    update: {},
    create: {
      nombre: "Pediatría",
    },
  });

  const dermatologia = await prisma.especialidad.upsert({
    where: {
      nombre: "Dermatología",
    },
    update: {},
    create: {
      nombre: "Dermatología",
    },
  });

  // Criar médicos
  await prisma.medico.createMany({
    data: [
      {
        nombre: "Carlos",
        apellido: "García",
        fechaNacimiento: new Date("1980-05-10"),
        telefono: "999111222",
        email: "carlos.garcia@clinicasalud.com",
        especialidadId: cardiologia.id,
      },
      {
        nombre: "Ana",
        apellido: "Martínez",
        fechaNacimiento: new Date("1985-08-20"),
        telefono: "999333444",
        email: "ana.martinez@clinicasalud.com",
        especialidadId: cardiologia.id,
      },
      {
        nombre: "Luis",
        apellido: "Rodríguez",
        fechaNacimiento: new Date("1978-03-15"),
        telefono: "999555666",
        email: "luis.rodriguez@clinicasalud.com",
        especialidadId: pediatria.id,
      },
      {
        nombre: "María",
        apellido: "López",
        fechaNacimiento: new Date("1988-11-25"),
        telefono: "999777888",
        email: "maria.lopez@clinicasalud.com",
        especialidadId: pediatria.id,
      },
      {
        nombre: "Jorge",
        apellido: "Fernández",
        fechaNacimiento: new Date("1982-01-30"),
        telefono: "999123456",
        email: "jorge.fernandez@clinicasalud.com",
        especialidadId: dermatologia.id,
      },
      {
        nombre: "Laura",
        apellido: "Sánchez",
        fechaNacimiento: new Date("1990-06-18"),
        telefono: "999654321",
        email: "laura.sanchez@clinicasalud.com",
        especialidadId: dermatologia.id,
      },
    ],
  });

  console.log("Seed ejecutado correctamente.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });