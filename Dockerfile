# Stage 1: Build the image
FROM node:alpine AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application and the .env file
COPY . .
COPY .env .env

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy the build files and other required files from the build stage
COPY --from=build /app/build /app/build
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json
COPY --from=build /app/server.js /app/server.js
COPY --from=build /app/.env /app/.env

# Install production dependencies only
RUN npm install --only=production

# Expose port
EXPOSE 8080

# Start the server
CMD ["npm", "start"]