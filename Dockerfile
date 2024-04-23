FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine as release

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production

EXPOSE 3000

CMD [ "node", "dist/index" ]
