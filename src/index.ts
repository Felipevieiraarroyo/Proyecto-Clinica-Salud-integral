import express from "express";
import cors from "cors";
import especialidadRoutes from "./routes/especialidad.routes.js";
import patientRoutes from "./routes/pacientes.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/pacientes", patientRoutes);
app.use("/especialidades", especialidadRoutes);
app.use("/medicos", doctorRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Clínica Salud funcionando correctamente",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});