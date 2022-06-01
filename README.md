# Nodejs-crypto-api

Crypto Exchange Rate API.

## Setup

Before starting working with this API it is necessary to install all the necessary dependenies. For that just do the following:

```bash
npm install
```

Using the package.json it will install all those dependencies.

## Start project

You have two ways of starting your proect.

The easiest way is to start the project is by using the 'dev' command that is in the scripts on package.json file. The command will run nodemon, so that you can do all the changes without restarting the server each time you save a change.

```bash
npm run dev
```

If you want to have the project runing inside a container, you can use the docker configuration.

### Docker

First you must have a Dockerfile configured. In the case of this project theres a basic configuration.

**Basic Configuration**

```bash
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
```

Go to the directory that has your Dockerfile and run the following command to build the Docker image. The -t flag lets you tag your image so it's easier to find later using the docker images command:

```bash
docker build . -t <your username>/node-web-app
```

The image will be listed by Docker, in the command line do:

```bash
docker images
```

Now you can run your image.

```bash
docker run -p 49160:8080 -d <your username>/node-web-app
```

Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container.
