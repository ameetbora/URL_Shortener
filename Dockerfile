# Use the official Node.js LTS image
FROM node:lts

# Set the working directory inside the container
WORKDIR /usr/src/index

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the Node.js application
EXPOSE 3000

# compile the typescript code
RUN npx tsc


# Start the Node.js application
CMD ["npm", "start"]