FROM node:19

RUN apt-get update
RUN apt-get install -y gnuplot

# Create app directory
WORKDIR /chemcalc-bot

# Install app dependencies
COPY package.json /chemcalc-bot/
RUN npm install --production

COPY src /chemcalc-bot/src

CMD [ "npm", "start" ]
