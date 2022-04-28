## Getting Started

Make sure you have installed and configured docker in your environment. After that you can run the below commands from the root of the project.

## Local Development

### Install packages

```sh
npm install
```

### Test

```sh
npm run test
```

```sh
npm run test:e2e
```

### Run migration

#### Apply

```sh
npx mikro-orm migration:up
```

#### Create new migrations

```sh
npx mikro-orm migration:create
```

### Run locally

```sh
npm run start:dev
```

```sh
http://localhost:3000
```

```sh
docker-compose build
docker-compose up
```

## Visual Studio code extensions

- ESLint
- Prettier
- EditorConfig
