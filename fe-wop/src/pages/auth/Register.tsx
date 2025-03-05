import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { showToast } from '../../utils/toaster';
import { translations } from '../../constants/translations';
import { useAuth } from '../../context/AuthContext';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { ROUTES } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        employeeId: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const { language, setLanguage } = useTranslation();
    const t = translations[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            showToast(t.passwordMismatch, 'error');
            return;
        }
        try {
            await register(userData);
            showToast(t.success, 'success');
            navigate(ROUTES.LOGIN);
        } catch (error) {
            showToast(t.error, 'error');
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'tr' : 'en');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-end space-x-4 mb-4">
                    <ThemeSwitcher />
                    <Button onClick={toggleLanguage} variant="outlined" color="blue">
                        {language === 'en' ? 'TR' : 'EN'}
                    </Button>
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">{t.register}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label={t.fullName}
                        type="text"
                        value={userData.fullName}
                        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                        placeholder={t.fullName}
                    />
                    <Input
                        label={t.email}
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        placeholder={t.email}
                    />
                    <Input
                        label={t.employeeId}
                        type="text"
                        value={userData.employeeId}
                        onChange={(e) => setUserData({ ...userData, employeeId: e.target.value })}
                        placeholder={t.employeeId}
                    />
                    <Input
                        label={t.username}
                        type="text"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        placeholder={t.username}
                    />
                    <Input
                        label={t.password}
                        type="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        placeholder={t.password}
                    />
                    <Input
                        label={t.confirmPassword}
                        type="password"
                        value={userData.confirmPassword}
                        onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                        placeholder={t.confirmPassword}
                    />
                    <Button type="submit" variant="filled" color="blue" fullWidth>
                        {t.register}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Register;