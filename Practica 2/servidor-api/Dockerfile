FROM node:latest
WORKDIR /usr/src/nodejs
COPY package*.json ./
RUN npm install
COPY . .
# El puerto se puede cambiar
EXPOSE 3100
RUN mkdir -p /elements/procs
CMD ["node", "index.js"]