FROM node:18-alpine

# Create app directory
WORKDIR /app/

# Install app dependencies
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]