# Usa la imagen base oficial de PostgreSQL
FROM postgres:15

# Variables de entorno para la base de datos
ENV POSTGRES_DB=clt
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=99.yoloco

# Copiar el script SQL de inicialización en el contenedor
COPY ./create_tables.sql /docker-entrypoint-initdb.d/

# Exponer el puerto 5432 para PostgreSQL
EXPOSE 5432