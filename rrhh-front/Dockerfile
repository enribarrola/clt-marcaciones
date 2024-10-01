# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 80 para servir la aplicación
EXPOSE 80

# Inicia Nginx cuando el contenedor esté listo
CMD ["nginx", "-g", "daemon off;"]