FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS="C:\Users\USER\Documents\2020\Development\WhiteBear\whitebear-ogcc-30a9458d1f03.json"

CMD ["node", "index.js"]
