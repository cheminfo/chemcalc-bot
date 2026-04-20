FROM node:24-slim

# chartjs-node-canvas (via node-canvas) needs cairo/pango/jpeg/gif/rsvg when
# compiling from source on platforms without a prebuilt binary (e.g. arm64).
RUN apt-get update \
  && apt-get install --no-install-recommends -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /chemcalc-bot

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

CMD ["npm", "start"]
