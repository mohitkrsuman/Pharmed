// Error is already a class, and consists name, message and stack properties. So, we can extend the Error class to create a custom error class. This custom error class will have a message and statusCode properties. The message property will be the error message, and the statusCode property will be the status code of the error. The ErrorHandler class will have a constructor that will take two parameters, message and statusCode. The constructor will call the super() method with the message parameter. The statusCode property will be assigned to the statusCode parameter. The ErrorHandler class will be exported as default. The errorMiddleware function will take four parameters, err, req, res, and next. The err parameter will be of type ErrorHandler.
class ErrorHandler extends Error{
   constructor(public message: string, public statusCode: number){
      super(message);
      this.statusCode = statusCode;
   }
}

export default ErrorHandler;
