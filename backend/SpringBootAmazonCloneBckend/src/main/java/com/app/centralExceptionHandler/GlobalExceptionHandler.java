package com.app.centralExceptionHandler;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleExceptions(ResourceNotFoundException e) {
        return new ResponseEntity<ErrorResponse>(new ErrorResponse("Item Not Found", e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
