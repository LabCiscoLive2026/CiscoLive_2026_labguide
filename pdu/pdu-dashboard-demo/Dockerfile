FROM docker.io/library/node:22-alpine AS build

WORKDIR /app

ARG VITE_LOGIN_USERNAME=admin
ARG VITE_LOGIN_PASSWORD=CiscoLive2026!

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM docker.io/library/nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
