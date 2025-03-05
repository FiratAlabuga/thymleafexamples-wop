type Translations = {
    [key in 'en' | 'tr']: {
        passwordMismatch: string;
        login: string;
        register: string;
        logout: string;
        fullName: string;
        email: string;
        employeeId: string;
        username: string;
        password: string;
        confirmPassword: string;
        success: string;
        error: string;
        addWorkOrder: string;
        updateWorkOrder: string;
        deleteWorkOrder: string;
        listWorkOrders: string;
        opyCode: string;
        maximoId: string;
        serviceRegistrationNumber: string;
        assigned: string;
        reported: string;
        application: string;
        description: string;
        completionDate: string;
        recordType: string;
        situationType: string;
        reasonCategory: string;
        solutionCategory: string;
        maintenance: string;
        inspection: string;
        repair: string;
        equipmentFailure: string;
        humanError: string;
        externalFactor: string;
        open: string;
        inProgress: string;
        closed: string;
        replacement: string;
        adjustment: string;
        save: string;
        cancel: string;
        delete: string;
        workOrderAdded: string;
        workOrderUpdated: string;
        workOrderDeleted: string;
        allRightsReserved: string;
    };
};

export const translations: Translations = {
    en: {
        passwordMismatch : 'Passwords do not match!',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        fullName: 'Full Name',
        email: 'Email',
        employeeId: 'Employee ID',
        username: 'Username',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        success: 'Success',
        error: 'Error',
        addWorkOrder: 'Add Work Order',
        updateWorkOrder: 'Update Work Order',
        deleteWorkOrder: 'Delete Work Order',
        listWorkOrders: 'List Work Orders',
        opyCode: 'OPY Code',
        maximoId: 'Maximo ID',
        serviceRegistrationNumber: 'Service Registration Number',
        assigned: 'Assigned',
        reported: 'Reported',
        application: 'Application',
        description: 'Description',
        completionDate: 'Completion Date',
        recordType: 'Record Type',
        situationType: 'Situation Type',
        reasonCategory: 'Reason Category',
        solutionCategory: 'Solution Category',
        maintenance: 'Maintenance',
        inspection: 'Inspection',
        repair: 'Repair',
        equipmentFailure: 'Equipment Failure',
        humanError: 'Human Error',
        externalFactor: 'External Factor',
        open: 'Open',
        inProgress: 'In Progress',
        closed: 'Closed',
        replacement: 'Replacement',
        adjustment: 'Adjustment',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        workOrderAdded: 'Work Order added successfully!',
        workOrderUpdated: 'Work Order updated successfully!',
        workOrderDeleted: 'Work Order deleted successfully!',
        allRightsReserved: 'All rights reserved.',
    },
    tr: {
        passwordMismatch : 'Şifreler eşleşmiyor!',
        login: 'Giriş Yap',
        register: 'Kayıt Ol',
        logout: 'Çıkış Yap',
        fullName: 'Tam Adı',
        email: 'E-posta',
        employeeId: 'Çalışan ID',
        username: 'Kullanıcı Adı',
        password: 'Şifre',
        confirmPassword: 'Şifreyi Onayla',
        success: 'Başarılı',
        error: 'Hata',
        addWorkOrder: 'İş Emri Ekle',
        updateWorkOrder: 'İş Emri Güncelle',
        deleteWorkOrder: 'İş Emri Sil',
        listWorkOrders: 'İş Emirlerini Listele',
        opyCode: 'OPY Kodu',
        maximoId: 'Maximo ID',
        serviceRegistrationNumber: 'Servis Kayıt Numarası',
        assigned: 'Atanan',
        reported: 'Bildiren',
        application: 'Uygulama',
        description: 'Açıklama',
        completionDate: 'Tamamlanma Tarihi',
        recordType: 'Kayıt Türü',
        situationType: 'Durum Türü',
        reasonCategory: 'Sebep Kategorisi',
        solutionCategory: 'Çözüm Kategorisi',
        maintenance: 'Bakım',
        inspection: 'Denetim',
        repair: 'Tamir',
        equipmentFailure: 'Ekipman Arızası',
        humanError: 'İnsan Hatası',
        externalFactor: 'Dış Faktör',
        open: 'Açık',
        inProgress: 'Devam Ediyor',
        closed: 'Kapalı',
        replacement: 'Değiştirme',
        adjustment: 'Ayarlama',
        save: 'Kaydet',
        cancel: 'İptal',
        delete: 'Sil',
        workOrderAdded: 'İş Emri başarıyla eklendi!',
        workOrderUpdated: 'İş Emri başarıyla güncellendi!',
        workOrderDeleted: 'İş Emri başarıyla silindi!',
        allRightsReserved: 'Tüm hakları saklıdır.',
    },
};