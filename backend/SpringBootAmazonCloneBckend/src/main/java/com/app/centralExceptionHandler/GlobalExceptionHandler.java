package com.app.centralExceptionHandler;

import com.app.customExceptions.AuthenticationException;
import com.app.customExceptions.ResourceNotFoundException;
import com.app.customExceptions.UnexpectedErrorException;
import com.app.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException e) {
        return new ResponseEntity<ErrorResponse>(new ErrorResponse("Item Not Found", e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException e) {
        return new ResponseEntity<ErrorResponse>(new ErrorResponse("Authentication Failed", e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnexpectedErrorException.class)
    public ResponseEntity<ErrorResponse> handleUnexpectedErrorException(UnexpectedErrorException e) {
        return new ResponseEntity<ErrorResponse>(new ErrorResponse("Unexpected Error Occurred", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
