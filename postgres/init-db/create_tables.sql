CREATE TABLE funcionarios (
    id_funcionario SERIAL PRIMARY KEY ,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT null,
    estado int not null default 1
);


CREATE TABLE marcaciones (
    id_marcacion SERIAL PRIMARY KEY,
    id_funcionario INT NOT NULL,
    fecha DATE NOT NULL,
    hora_entrada TIME NOT NULL,
    hora_salida TIME,
    FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario)
);