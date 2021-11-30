FROM node:14-alpine as build

ENV NODE_ENV build

WORKDIR /src

COPY package.json ./
COPY package-lock.json ./

COPY . .

RUN npm ci \
    && npm run build \
    && npm prune --production

FROM node:14-alpine as production

ENV NODE_ENV production

WORKDIR /src

COPY --from=build /src/package*.json /src/
COPY --from=build /src/node_modules/ /src/node_modules/
COPY --from=build /src/dist /src/dist

USER node

CMD ["node", "dist/main"]
