FROM node:14-alpine as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . /app/

RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent
RUN npm run build
# production environment



FROM nginx:1.21.1-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]