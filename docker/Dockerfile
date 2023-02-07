FROM node:19

RUN apt-get update
# On macOS M1 the ARM version of npm canvas needs to be compiled and this requires the following packages
RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y

# Create app directory
WORKDIR /chemcalc-bot

# Install app dependencies
COPY package.json /chemcalc-bot/
RUN npm install --production

COPY src /chemcalc-bot/src

CMD [ "npm", "start" ]
