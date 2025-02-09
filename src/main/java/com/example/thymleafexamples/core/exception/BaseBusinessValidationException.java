package com.example.thymleafexamples.core.exception;

import com.example.thymleafexamples.core.exception.rule.BusinessValidationRule;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

import java.util.*;

public class BaseBusinessValidationException extends BaseException{
    private static final long serialVersionUID = 1L;
    private final BusinessValidationRule rule;
    private final transient List<MessageVariable> messageVariables;

    public BaseBusinessValidationException(BusinessValidationRule rule) {
        this(rule,rule.getDescription());
    }

    public BaseBusinessValidationException(BusinessValidationRule rule,String message) {
        super(message);
        this.rule = rule;
        this.messageVariables = Collections.emptyList();
    }

    public BaseBusinessValidationException(BusinessValidationRule rule, List<MessageVariable> messageVariables) {
        super(rule.getDescription());
        this.rule = rule;
        this.messageVariables = messageVariables;
    }

    public BaseBusinessValidationException(BusinessValidationRule rule,MessageVariable... messageVariables) {
        this(rule, Arrays.asList(messageVariables));
    }

    public BusinessValidationRule getRule(){
        return rule;
    }
    public List<MessageVariable> getMessageVariables(){return messageVariables;}
    public Map<String,Object> getMessageVariablesMap(){
        Map<String,Object> msgVarMap = new HashMap<>();
        if (!CollectionUtils.isEmpty(messageVariables)){
            for (MessageVariable messageVariable : messageVariables){
                if (StringUtils.isNotBlank(messageVariable.getName())){
                    msgVarMap.put(messageVariable.getName(),messageVariable.getValue());
                }
            }
        }
        return msgVarMap;
    }
}
