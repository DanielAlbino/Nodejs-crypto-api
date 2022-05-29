FROM node:16

# Create app folder
RUN mkdir -p /nodejs/app

# Set working directory
WORKDIR /nodejs/app

# Copy json to app folder
COPY package.json /nodejs/app

#Install Depedencies
RUN npm install

# Bundle app source
COPY . /nodejs/app

EXPOSE 8080

# Execute command
CMD ["npm", "start"]