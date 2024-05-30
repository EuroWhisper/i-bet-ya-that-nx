FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system reminder-mailer && \
    adduser --system -G reminder-mailer reminder-mailer

# Copy the application files
COPY dist/apps/reminder-mailer reminder-mailer

# Copy the Prisma schema file and other necessary files
COPY libs/prisma-shared/prisma/schema.prisma reminder-mailer/prisma/schema.prisma

RUN chown -R reminder-mailer:reminder-mailer .

# Install dependencies
RUN npm --prefix reminder-mailer --omit=dev -f install

# Generate Prisma client
RUN npx prisma generate --schema=reminder-mailer/prisma/schema.prisma

CMD [ "node", "reminder-mailer" ]