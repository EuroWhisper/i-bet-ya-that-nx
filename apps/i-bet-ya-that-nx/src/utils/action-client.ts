import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';

export class CustomError extends Error {
  constructor(message: string, name: string, stack?: string) {
    super(message);
    this.name = name;
    this.stack = stack;
  }
}

export const actionClient = createSafeActionClient({
  // Can also be an async function.
  handleReturnedServerError(e) {
    // In this case, we can use the 'CustomError` class to unmask errors
    // and return them with their actual messages to the client.
    if (e instanceof CustomError) {
      return e.message;
    }

    // Every other error that occurs will be masked with the default message.
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
