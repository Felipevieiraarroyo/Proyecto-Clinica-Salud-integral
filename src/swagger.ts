const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Clínica Salud API",
    version: "1.0.0",
    description: "API para la gestión de pacientes, médicos y consultas",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/reports/appointments-by-specialty": {
      get: {
        summary: "Obtener citas agrupadas por especialidad",
        description:
          "Devuelve el total de consultas agrupadas por especialidad médica.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Reporte obtenido correctamente",
          },
          "401": {
            description: "Token no proporcionado o inválido",
          },
          "403": {
            description: "El usuario no tiene permisos de GERENCIA",
          },
          "500": {
            description: "Error interno del servidor",
          },
        },
      },
    },
    "/reports/daily-cutoff": {
      get: {
        summary: "Obtener corte diario de consultas",
        description:
          "Devuelve las consultas agrupadas por estado para una fecha determinada.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "date",
            in: "query",
            required: true,
            description: "Fecha en formato YYYY-MM-DD",
            schema: {
              type: "string",
              format: "date",
              example: "2026-09-07",
            },
          },
        ],
        responses: {
          "200": {
            description: "Corte diario obtenido correctamente",
          },
          "400": {
            description: "Formato de fecha inválido",
          },
          "401": {
            description: "Token no proporcionado o inválido",
          },
          "403": {
            description: "El usuario no tiene permisos de GERENCIA",
          },
          "500": {
            description: "Error interno del servidor",
          },
        },
      },
    },
  },
};

export default swaggerDocument;