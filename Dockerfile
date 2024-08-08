FROM public.ecr.aws/q6y2q4k8/node:18.12.0-alpine3.16
WORKDIR /app
COPY . .

RUN apk add --no-cache mysql-client
RUN npm install -g npm@9.7.1
RUN npm install --save express
RUN npm install mysql
RUN npm install ejs
CMD ["node", "src/main.js"]
USER 1001
EXPOSE 3000