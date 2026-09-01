Paciente {
    id INT PRIMARY KEY
    nombre STRING NOT NULL
    apellido STRING NOT NULL
    fechaNacimiento DATETIME NOT NULL
    telefono STRING NOT NULL
    email STRING UNIQUE NOT NULL
}

Medico {
    id INT PRIMARY KEY 
    nombre STRING NOT NULL
    apellido STRING NOT NULL
    fechaNacimiento DATETIME NOT NULL
    telefono STRING  NOT NULL
    email STRING NOT NULL
    fk_especialidad INT NOT NULL
}

Especialidad {
    id INT PRIMARY KEY
    nombre STRING NOT NULL
}

Consulta {
    id INT PRIMARY KEY
    fk_pacienteId INT NOT NULL
    fk_medicoId INT NOT NULL
    fechaHora DATETIME NOT NULL
    estado ENUM NOT NULL 
    Valores permitidos: PROGRAMADA, COMPLETADA, CANCELADA
}

Relações:

- Um paciente pode ter muitas consultas, mas uma consulta pertence a um único paciente.
- Um médico pode ter muitas consultas, mas uma consulta pertence a um único médico.
- Uma especialidade pode ter muitos médicos, mas um médico pertence a uma única especialidade.