# Imagen base
FROM node:20

# Directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Crea la carpeta "dist" con el build de producción
RUN npm run build

# Inicia el servidor usando el build de producción
CMD [ "node", "dist/main.js" ]