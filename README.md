# I Bet Ya That

I Bet Ya That is a web application that allows users to make predictions about future events and eventually bet virtual points (no real money involved) on the outcomes of those predictions. Users can create predictions, make bets on those predictions, and receive reminders about the predictions they have made. Leaderboards will be implemented to show the users with the most points.

## Installation
First you need to run the following command to install nx globally: 
`npm add --global nx@latest`

Then, from the root directory of the repository, run the classic:
`npm i`

After that, follow the instructions below to get whichever service you need to work on running locally.

## i-bet-ya-that-nx

This is the main application for the i-bet-ya-that project. It is a [Next.js](https://nextjs.org/) application that provides the frontend for the project, as well as the API for the project.

### Environment variables

The i-bet-ya-that-nx service requires the following environment variables to be set in order to run (place in ./apps/i-bet-ya-that/.env):

OpenAI API key:
`OPENAI_API_KEY=[API key]`

Connect to Supabase via connection pooling with Supavisor.
`DATABASE_URL=[Postgres connection string]`

Direct connection to the database. Used for migrations.
`DIRECT_URL=[Postgres direct connection string]`

### Running the i-bet-ya-that-nx service

The i-bet-ya-that-nx service can be started by running the following command:
`nx run i-bet-ya-that-nx:dev`

Then, the frontend can be accessed at:
`http://localhost:3000`

### Libraries

UI components: [Radix Primitive](https://radix-ui.com/primitive/docs/getting-started/introduction)

Form control: [React Hook Form](https://react-hook-form.com/)

Date formatting: [date-fns](https://date-fns.org/)

Themeing: To prevent a flicker on hydration, we use the next-themes library to set the theme based on the user's system preference. [next-themes](https://github.com/pacocoursey/next-themes)

## Reminder mailer

The reminder mailer service is a service that checks the database for reminders that are due to be sent and sends them to the user's email address. The service uses [Redis](https://redis.io/) and [BullMQ](https://docs.bullmq.io/) to manage the queue of reminders to be sent.

### Environment variables

The reminder mailer service requires the following environment variables to be set in order to run (place in ./apps/reminder-mailer/.env):

Redis local connection string:
`REDIS_URL="redis://localhost:6379"`

Connect to Supabase via connection pooling with Supavisor.
`DATABASE_URL=[Postgres connection string]`

Direct connection to the database. Used for migrations.
`DIRECT_URL=[Postgres direct connection string]`

### Running the reminder mailer service

In order to start the reminder mailer service, you need to have a redis server running. You can start a local redis server using [Docker](https://docs.docker.com/engine/install/) with the following command:
`docker run --name redis-local -p 6379:6379 -d redis`

Then, for subsequent runs, you can start the redis server using the following command:
`docker start redis-local`

After starting the redis server, you can start the reminder mailer service by running the following command:
`nx run reminder-mailer:serve`

## Internal libraries

### prisma-shared

The prisma-shared library is a shared library that contains the Prisma client and the Prisma schema. It is used by the i-bet-ya-that-nx and reminder-mailer services to interact with the database. The schema is defined in the `schema.prisma` file and is the single source of truth for the database schema. The generated data types as well as the Prisma client are exported from the library, so they can be reused wherever necessary, avoiding duplicate types and schema files.

### chatgpt

The chatgpt library is a library that contains functions to fetch prediction suggestions and will eventually contain functions to check whether a prediction is correct or not. It is used by the i-bet-ya-that-nx service to interact with the OpenAI API.

## Deployment

On merge to the main branch:

- The i-bet-ya-that project is automatically deployed to [Vercel](https://vercel.com/). The deployment is done using the [Vercel GitHub integration](https://vercel.com/docs/git).
- The reminder mailer service is automatically deployed to [Fly.io](https://fly.io/) VIA the github workflow in .github/workflows/deploy.yml. It requires the following secrets to be set in the GitHub repository:
  - `FLY_API_TOKEN`: The Fly.io API token.
