/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `especialidad` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "especialidad_nombre_key" ON "especialidad"("nombre");
