FROM node:lts

LABEL fly_launch_runtime="nodejs"

RUN corepack enable

WORKDIR /app

COPY package.json .
RUN pnpm i

COPY . .
RUN pnpm build

CMD [ "npm", "run", "start" ]
