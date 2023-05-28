import { HttpStatusCode } from 'axios';

class ErrorResponse extends Error {
  public statusCode: HttpStatusCode;

  constructor(message: string, statusCode: HttpStatusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { ErrorResponse };
