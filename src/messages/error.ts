export interface ErrorMessage {
  type: 'error'
  payload: {
    message: string
  }
}

export const createErrorMessage = (message: string): ErrorMessage => ({
  type: 'error',
  payload: {
    message
  }
})