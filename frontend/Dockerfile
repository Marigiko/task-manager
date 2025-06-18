# Etapa única con build ya hecho
FROM node:20

WORKDIR /app

# Copiamos el build generado localmente
COPY build ./build

# Servir con serve
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
