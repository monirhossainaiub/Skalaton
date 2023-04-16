class AppError extends Error {
  public isOperational: boolean;
  statusCode: any;
  status: any;
  constructor(message: any, statusCode:any) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
