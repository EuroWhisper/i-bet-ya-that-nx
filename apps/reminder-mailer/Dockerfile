FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system reminder-mailer && \
    adduser --system -G reminder-mailer reminder-mailer

COPY dist/apps/reminder-mailer reminder-mailer

COPY libs/prisma-shared/prisma/schema.prisma reminder-mailer/prisma/schema.prisma

RUN chown -R reminder-mailer:reminder-mailer .

RUN npm --prefix reminder-mailer --omit=dev -f install

RUN npx prisma generate --schema=reminder-mailer/prisma/schema.prisma

CMD [ "node", "reminder-mailer" ]