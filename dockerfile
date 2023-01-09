FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn prestart
RUN yarn build
CMD [ "yarn", "start" ]
EXPOSE 3001