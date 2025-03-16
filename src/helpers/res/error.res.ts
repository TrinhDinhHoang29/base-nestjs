export class CustomError extends Error {
  statusCode?: number;
  error?: object;

  constructor(statusCode?: number, message?: string, error: object = {}) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;

    // Duy trì prototype chain
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
