# I Bet Ya That

I Bet Ya That is a web application that allows users to make predictions about future events and eventually bet virtual points (no real money involved) on the outcomes of those predictions. Users can create predictions, make bets on those predictions, and receive reminders about the predictions they have made. Leaderboards will be implemented to show the users with the most points.

## Installation

First, you need to run the following command to install nx globally:
`npm add --global nx@latest`

Then, from the root directory of the repository, run the classic:
`npm i`

After that, follow the instructions below to get whichever service you need to work on running locally.

## prediction-frontend

This is the main application for the i-bet-ya-that project. It is a [Next.js](https://nextjs.org/) application that provides the frontend for the project, as well as the API for the project.

### Environment variables

The prediction-frontend service requires the following environment variables to be set in order to run (place in ./apps/prediction-frontend/.env):

OpenAI API key:
`OPENAI_API_KEY=[API key]`

NextAuth.js secret:
`AUTH_SECRET=[Secret]`

Google OAuth client
`AUTH_GOOGLE_ID=[OAuth ID]`
`AUTH_GOOGLE_SECRET=[OAuth secret]`

Connect to Supabase via connection pooling with Supavisor.
`DATABASE_URL=[Postgres connection string]`

Direct connection to the database. Used for migrations.
`DIRECT_URL=[Postgres direct connection string]`

### Running the prediction-frontend service

The prediction-frontend service can be started by running the following command:
`nx run prediction-frontend:dev`

Then, the frontend can be accessed at:
`http://localhost:3000`

### Libraries

Authentication: [NextAuth.js](https://next-auth.js.org/)

UI components: [Radix Primitive](https://radix-ui.com/primitive/docs/getting-started/introduction)

Form control: [React Hook Form](https://react-hook-form.com/)

Date formatting: [date-fns](https://date-fns.org/)

Mutations: For calling server actions and tracking pending/success/error state we use [next-safe-action](https://next-safe-action.dev/), however we currently use the experimental branch as it provides type safety for the action arguments.

Themeing: To prevent a flicker on hydration, we use the next-themes library to set the theme based on the user's system preference. [next-themes](https://github.com/pacocoursey/next-themes)

Iconography: For icons, we use the Tabler Icons library. [Tabler Icons](https://www.npmjs.com/package/@tabler/icons-react)

## Reminder mailer

The reminder mailer service is a service that checks the database for reminders that are due to be sent and sends them to the user's email address. The service uses [Redis](https://redis.io/) and [BullMQ](https://docs.bullmq.io/) to manage the queue of reminders to be sent, and [Mailersend](https://www.mailersend.com/) to send the reminder emails.

### Environment variables

The reminder mailer service requires the following environment variables to be set in order to run (place in ./apps/reminder-mailer/.env):

Redis local connection string:
`REDIS_URL="redis://localhost:6379"`

Mailersend API key and sender address:
`MAILERSEND_API=[Mailsend API key]`
`MAILERSEND_SENDER=[<sender>@<mailersend-domain>.com]`

Connect to Supabase via connection pooling with Supavisor.
`DATABASE_URL=[Postgres connection string]`

Direct connection to the database. Used for migrations.
`DIRECT_URL=[Postgres direct connection string]`

Environment variables for different environments, determining which frontend base URL to use for links in the emails:
`ENVIRONMENT=development` for local development, or `ENVIRONMENT=production` for production.
`DEVELOPMENT_FRONTEND_BASE_URL=http://localhost:3000`
`PRODUCTION_FRONTEND_BASE_URL=https://i-bet-ya-that.vercel.app`

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

### ui-common

The ui-common library is a library that houses highly reusable UI components (Button, Text, Card etc...).

### email-templates

The email-templates library contains the templates used by email sending services. It uses the [react-email](https://react.email/) library.
To preview changes while working on email template componenets, run:
`npm run email-dev`

### chatgpt

The chatgpt library is a library that contains functions to fetch prediction suggestions and will eventually contain functions to check whether a prediction is correct or not. It is used by the i-bet-ya-that-nx service to interact with the OpenAI API.

## Deployment

On merge to the main branch:

- The i-bet-ya-that project is automatically deployed to [Vercel](https://vercel.com/). The deployment is done using the [Vercel GitHub integration](https://vercel.com/docs/git).
- The reminder mailer service is automatically deployed to [Fly.io](https://fly.io/) VIA the github workflow in .github/workflows/deploy.yml. It requires the following secrets to be set in the GitHub repository:
  - `FLY_API_TOKEN`: The Fly.io API token.
