package com.example.thymleafexamples.core.exception;

import java.io.Serializable;

public class MessageVariable implements Serializable {
    private static final long serialVersionUID = 1L;
    private final String name;
    private final transient Object value;

    public MessageVariable(String name, Object value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public Object getValue() {
        return value;
    }
}
