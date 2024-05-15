class ApiError extends Error {
    statusCode: number;
    data: null;
    success: boolean;
    errors: any[];
  
    constructor(statusCode: number, message = "something went wrong", errors: any[] = []) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.success = false;
      this.errors = errors;
    }
  }
  
  export { ApiError };
  