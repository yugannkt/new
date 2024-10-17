# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server to serve the built application
FROM nginx:alpine

# Copy the built application to the nginx directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 8080
EXPOSE 80
#EXPOSE 80
# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
