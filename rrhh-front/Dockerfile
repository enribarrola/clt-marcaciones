# Etapa de construcción
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -la /app/dist

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html