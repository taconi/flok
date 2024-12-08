FROM node:23.3.0

WORKDIR /flok

COPY . .

RUN npm install && npm run build


WORKDIR /flok/packages/web

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
