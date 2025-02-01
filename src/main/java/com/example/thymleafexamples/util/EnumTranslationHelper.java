package com.example.thymleafexamples.util;

import com.example.thymleafexamples.domain.enums.ReasonCategory;
import com.example.thymleafexamples.domain.enums.RecordType;
import com.example.thymleafexamples.domain.enums.SituationType;
import com.example.thymleafexamples.domain.enums.SolutionCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Locale;

@Component
public class EnumTranslationHelper {

    @Autowired
    private MessageSource messageSource;

    // Enum çevirisi almak için yardımcı fonksiyon
    public <E extends Enum<E>> Map<String, String> getEnumLabels(Class<E> enumClass, Locale locale) {
        Map<String, String> labels = new HashMap<>();
        for (E enumConstant : enumClass.getEnumConstants()) {
            labels.put(enumConstant.name(), getTranslation(enumConstant, locale));
        }
        return labels;
    }

    // Dinamik çeviri fonksiyonu
    private <E extends Enum<E>> String getTranslation(E enumConstant, Locale locale) {
        if (enumConstant instanceof RecordType) {
            return messageSource.getMessage("recordType." + enumConstant.name(), null, locale);
        } else if (enumConstant instanceof SituationType) {
            return messageSource.getMessage("situationType." + enumConstant.name(), null, locale);
        } else if (enumConstant instanceof ReasonCategory) {
            return messageSource.getMessage("reasonCategory." + enumConstant.name(), null, locale);
        } else if (enumConstant instanceof SolutionCategory) {
            return messageSource.getMessage("solutionCategory." + enumConstant.name(), null, locale);
        }
        return enumConstant.name(); // Eğer çeviri bulunamazsa, enum'un ismini döndür
    }
}
