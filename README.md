# YoTask Backend

This project is a Nest.js application providing REST API for to consume.

## Tech Stack

- Nest.js
- Typescript
- MongoDB

## Getting Started

To get started running the project locally, please follow the steps below.

First, clone the repository.

```bash
git clone https://github.com/kalwabed/yotask-be.git
```

Then, install dependencies and fetch data to your local machine.

```bash
cd yotask-be
pnpm install
```

Copy the `.env.example` file to a new file with the name `.env`:

```bash
cp .env.example .env
```

Then, make sure you already have a MongoDB instance (cloud or locally) and fill in the connection uri appropriately:

```env
# .env
MONGO_URL=
```

Finally, run the development server.

```bash
pnpm start:dev
```

Open [localhost:8000/swagger](http:localhost:8000/swagger) with your browser to see the Swagger.

## Deployment

For deployment, we can use service like AWS or Railway.

## Learn More

- https://nestjs.com

