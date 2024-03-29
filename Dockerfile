###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

# USER node

###################
# BUILD FOR PRODUCTION
###################

# FROM node:18-alpine As build

# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./

# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

# RUN npm ci --only=production && npm cache clean --force

# USER node

# CMD [ "npm", "run", "start:dev" ]

###################
# PRODUCTION
###################

# FROM node:18-alpine As production

# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]