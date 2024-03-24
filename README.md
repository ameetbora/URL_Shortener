# URL_Shortner
A scalable and efficient URL shortener service implemented in Node.js and TypeScript. This service generates unique aliases for long URLs and ensures correct redirection.


# How to Start the application locally
1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Run `npx tsc` to compile the TypeScript code
4. Run `node dist/index.js` to start the server
5. The server will start on `http://localhost:3000`

# API Endpoints
1. POST `/shorten`
   - Request Body: `{ "url": "https://www.google.com" }`
   - Response: `{ "shortUrl": "http://localhost:3000/abc123" }`

2. GET `/:alias`
    - Redirects to the original URL

# How to connect to MongoDB
# Data Storage
- The service uses a simple in-memory data store to store the mapping between the alias and the original URL. This data store is implemented using a Map data structure in Node.js.

# Scalability
- The service can be scaled horizontally by deploying multiple instances of the service behind a load balancer. The data store can be replaced with a distributed key-value store like Redis or DynamoDB to ensure that the data is available across all instances.

# Efficiency
- The service generates unique aliases for each URL by using a combination of random characters and numbers. It ensures that the generated aliases are unique and do not collide with existing aliases.

# Error Handling
- The service handles errors gracefully by returning the appropriate HTTP status codes and error messages. It checks for invalid URLs and returns a 400 Bad Request error if the URL is not valid. It also returns a 404 Not Found error if the alias is not found in the data store.

# Testing
- The service is tested using Jest, a popular testing framework for Node.js applications. It includes unit tests for the service logic and integration tests for the API endpoints. The tests cover various scenarios like generating aliases, storing data in the data store, and handling errors.

# How to run the tests
- Run `npm test` to run all the tests