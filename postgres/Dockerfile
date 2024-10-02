# Usa la imagen base oficial de PostgreSQL
FROM postgres:15


# Copiar el script SQL de inicialización en el contenedor
ADD ./init-db/create_tables.sql /docker-entrypoint-initdb.d/

# Exponer el puerto 5432 para PostgreSQL
EXPOSE 5431