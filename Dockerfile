# Use the official lightweight Node.js 18 image.
FROM node:18-alpine

# Set the working directory to the root of your project.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code (including src directory) to the container image.
COPY . .

# Add Alpine repositories for MongoDB (main and community).
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories

# Update package index and install MongoDB.
RUN apk update
RUN apk add mongodb=3.4.4-r0

# Create MongoDB data directory.
RUN mkdir -p /data/db

# Expose MongoDB port.
EXPOSE 27017

# Start MongoDB and your Node.js app
CMD ["mongod", "&", "node", "index.js"]