package com.example.thymleafexamples.exception;

import com.example.thymleafexamples.core.exception.BaseBusinessValidationException;
import com.example.thymleafexamples.core.exception.MessageVariable;
import com.example.thymleafexamples.core.exception.rule.BusinessValidationRule;

import java.util.Arrays;
import java.util.List;

public class ADSBusinessValidationException extends BaseBusinessValidationException {
    private static final long serialVersionUID = 1L;

    public ADSBusinessValidationException(BusinessValidationRule rule, Object message) {
        super(rule);
    }
    private static List<MessageVariable> getMessageVariables(BusinessValidationRule rule, Object message){
        MessageVariable messageVariable = new MessageVariable(rule.getDescription(),message);
        return Arrays.asList(messageVariable);
    }
}
