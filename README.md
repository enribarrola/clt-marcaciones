
# CLT-Marcaciones

Sistema de RRHH de control de funcionarios.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- [Docker](https://www.docker.com/get-started) (Versión estable recomendada)
- [Docker Compose](https://docs.docker.com/compose/install/) (Incluido en Docker Desktop)

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

1. **Clonar el repositorio**

   Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio:

   ```bash
   git clone [https://github.com/tu-usuario/nombre-del-repositorio.git](https://github.com/enribarrola/clt-marcaciones.git)
   ```

2. **Navegar a la carpeta del proyecto**

   Mueve a la carpeta del repositorio recién clonado:

   ```bash
   cd nombre-del-repositorio
   ```

3. **Ejecutar Docker Compose**

   Una vez dentro de la carpeta del proyecto, ejecuta el siguiente comando para levantar los contenedores:

   ```bash
   docker-compose up
   ```

   Este comando construirá y ejecutará todos los servicios definidos en tu archivo `docker-compose.yml`. Durante la ejecución, podrás ver los logs de cada contenedor en la terminal.

4. **Acceso a la Aplicación**

   El front-end estará disponible en la siguiente URL:

   - [http://localhost:3000](http://localhost:3000)

   Puedes abrir tu navegador y acceder a esta dirección para ver la aplicación en funcionamiento.

5. **Detener los contenedores**

   Si necesitas detener los contenedores, puedes usar `Ctrl + C` en la terminal donde está corriendo `docker-compose up`.

6. **Eliminar contenedores y redes**

   Para eliminar los contenedores y redes creadas por Docker Compose, ejecuta el siguiente comando:

   ```bash
   docker-compose down
   ```

## Notas

- Asegúrate de que el puerto `3000` no esté ocupado por otra aplicación antes de ejecutar el proyecto.
- Revisa los archivos de configuración y asegúrate de que las variables de entorno estén configuradas correctamente en el archivo `docker-compose.yml` si es necesario.
