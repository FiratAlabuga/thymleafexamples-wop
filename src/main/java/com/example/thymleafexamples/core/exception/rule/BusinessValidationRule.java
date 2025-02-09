package com.example.thymleafexamples.core.exception.rule;

import java.io.Serializable;

public interface BusinessValidationRule extends Serializable {
    String getCode();
    String getDescription();
}
