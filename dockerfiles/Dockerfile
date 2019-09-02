FROM node:10 AS devscore-frontend

EXPOSE 9999

ADD . /devscore
WORKDIR /devscore
ENV PATH /devscore/node_modules/.bin:$PATH

RUN npm install && npm install node-sass && npm run build
CMD ["npm", "run" , "prod"]