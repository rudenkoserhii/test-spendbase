FROM node:22

RUN apt-get update && apt-get install -y postgresql-client

# Create and set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Expose port
EXPOSE 3333

# Start the app
CMD ["node", "dist/src/main.js"]