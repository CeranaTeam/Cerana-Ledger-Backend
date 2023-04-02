FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files to the working directory
COPY . .

# Expose port 3000
EXPOSE 8080

# Start the application
# CMD ["npm", "start"]