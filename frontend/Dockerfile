# FROM node:18 as base
FROM public.ecr.aws/docker/library/node:lts-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base as dev
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "dev"]
USER 1000:1000  

# EXPOSE 5173
# EXPOSE 4173

FROM base as prod
ENV NODE_ENV=production
COPY . .
RUN rm -rf dist && npm cache clean --force && npm run build
CMD ["npm", "run", "preview" ,"-- --host"]

