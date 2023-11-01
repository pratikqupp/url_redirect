# Use the official Node.js image as a base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build your React application (replace 'build' with your actual build script)
RUN npm run build

# Expose the port your app runs on (usually 3000)
EXPOSE 3000

# Start your application
CMD [ "npm", "start" ]
