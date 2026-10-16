export class AppError extends Error {
  constructor(statusCode, message, error) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = error;
  }
}
