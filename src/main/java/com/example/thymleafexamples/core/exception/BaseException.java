package com.example.thymleafexamples.core.exception;

import java.util.Objects;

public class BaseException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public BaseException(String message) {
        super(message);
    }

    public BaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public BaseException(Throwable cause) {
        super(cause);
    }

    public String getMessageOfCause(){
        if(Objects.nonNull(getCause())){
            if (Objects.nonNull(getCause().getMessage())){
                return getCause().getMessage();
            } else if (Objects.isNull(getMessage())) {
                return getCause().getClass().getName();
            }
        }
        return getMessage();
    }
}
