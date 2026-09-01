import "dotenv/config"
import { PrismaClient } from "../src/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const especialidades = ["Cardiología", "Pediatría", "Dermatología"];

  for (const nombre of especialidades) {
    await prisma.especialidad.upsert({
      where: {
        nombre,
      },
      update: {},
      create: {
        nombre,
      },
    });
  }

  console.log("Especialidades cargadas correctamente.");
}
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });