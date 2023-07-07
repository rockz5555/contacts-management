# Contacts Management

This is a full-stack application consisting of a client-side application and a server-side backend for managing
contacts.

## Client-side

### Installation

1. Clone the repository.
2. Navigate to the `client` folder.
3. Install the dependencies using `npm install`.

### Usage

1. Start the application using `npm start`.
2. Access the application at `http://localhost:3000`.

### Scripts

- **start**: `env-cmd -f .env.development react-scripts start`
- **build**: `react-scripts build`
- **build:dev**: `env-cmd -f .env.development react-scripts build`
- **build:prod**: `env-cmd -f .env.production react-scripts build`
- **eject**: `react-scripts eject`

## Server-side

### Installation

1. Navigate to the `server` folder.
2. Install the dependencies using `npm install`.

### Usage

1. Start the server using `npm start`.
2. The server will be running at `http://localhost:9000`.

### Scripts

- **start**: `node dist/main`
- **start:dev**: `nest start --watch`
- **format**: `prettier --write "src/**/*.ts" "test/**/*.ts"`

### Note

`Install MongoDB locally to your PC`
