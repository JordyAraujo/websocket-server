import { ErrorMessage } from "../error";

export const createErrorMessage = (message: string): ErrorMessage => ({
  type: 'error',
  payload: {
    message
  }
})