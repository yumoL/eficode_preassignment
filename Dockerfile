FROM node:alpine

WORKDIR /app

COPY . .
RUN npm install && \
    chown -R node /app

USER node

EXPOSE 3000

CMD ["npm", "start"]