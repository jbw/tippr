FROM node:14-alpine as build

WORKDIR /src
COPY package.json ./
COPY package-lock.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

FROM node:14-alpine as final
WORKDIR /src
COPY --from=build /src/package*.json /src/
COPY --from=build /src/node_modules/ /src/node_modules/
COPY --from=build /src/dist /src/dist

CMD ["node", "dist/tippr.worker.js"]
