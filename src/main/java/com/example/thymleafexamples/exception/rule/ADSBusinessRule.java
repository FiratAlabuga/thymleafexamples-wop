package com.example.thymleafexamples.exception.rule;


import com.example.thymleafexamples.core.exception.rule.BusinessValidationRule;

public enum ADSBusinessRule implements BusinessValidationRule {
    AUTH_ERROR("ADS-A1000"),
    USER_NOT_FOUND("ADS-O1000")

    ;

    private final String code;
    private final String description;

    ADSBusinessRule(String code) {
        this.code = code;
        this.description = "";
    }

    ADSBusinessRule(String code, String description) {
        this.code = code;
        this.description = description;
    }

    @Override
    public String getCode() {
        return null;
    }

    @Override
    public String getDescription() {
        return null;
    }
}
