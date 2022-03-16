FROM node:16-alpine3.14
RUN npm install sequelize -g
WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV=production
ENV PORT=4000
CMD ["npm", "start" ]
EXPOSE 4000
