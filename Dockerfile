FROM node:14 as builder
WORKDIR /app
COPY package.json /app
RUN yarn install --force
COPY . /app
RUN yarn build

### Serve Step
# pull the Node.js Docker image
FROM nginx:alpine as prod

# change working directory
WORKDIR /usr/share/nginx/html

# copy files from previous step
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/nginx.conf
# our app is running on port 3000 within the container, so need to expose it
EXPOSE 80