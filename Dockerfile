FROM node:12.18.3
WORKDIR /app
COPY ./package*.json /app/
RUN npm install
COPY . .
EXPOSE 4000
COPY . .
CMD ["node", "./bin/www"]