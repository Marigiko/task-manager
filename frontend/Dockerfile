FROM node:20

WORKDIR /app

COPY . .

RUN npm install && npm run build

# Serve build using a simple HTTP server
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
