FROM node:16

RUN npm install --force -g yarn

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

ENV PORT=8080
ENV PUBLIC_PORT=5001
ENV CURRENT_HOST="DOCKER"

EXPOSE 8080

CMD ["yarn", "start"]