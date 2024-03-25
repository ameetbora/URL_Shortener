# URL_Shortner
A scalable and efficient URL shortener service implemented in Node.js and TypeScript. This service generates unique aliases for long URLs and ensures correct redirection.


# How to Start the application locally
## Step 1:  Clone the repository
`git clone https://github.com/parth5795/URL_Shortner.git`

# Docker 
## Step 2 : Pull the Official MongoDB Docker Image
`docker pull mongo`

## Step 3 : Create a network on which docker containers can share data
`docker network create url-shortner-network --driver bridge`

## Step 4 : Run the MongoDB container
`docker run --rm -d --name mongodb-server --network url-shortner-network -p 27017:27017 -d mongo`

## Step 5 : Build the Docker Image
`docker build -t url-shortner .`

## Step 6 : Run the Docker Container
`docker run --rm -d --name url-shortner --network url-shortner-network -p 3000:3000 url-shortner`

## Step 7 : Run the test suite from the Docker Container
`docker run --rm -it --name url-shortner-test --network url-shortner-network url-shortner npm test`
