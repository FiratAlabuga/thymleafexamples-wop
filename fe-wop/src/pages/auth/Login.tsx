import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { showToast } from '../../utils/toaster';
import { translations } from '../../constants/translations';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useAuth();
    const { language, setLanguage } = useTranslation();
    const navigate = useNavigate();
    const t = translations[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(credentials);
            showToast(t.success, 'success');
            navigate(ROUTES.LIST_WORK_ORDERS);
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
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">{t.login}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label={t.username}
                        type="text"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        placeholder={t.username}
                    />
                    <Input
                        label={t.password}
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        placeholder={t.password}
                    />
                    <Button type="submit" variant="filled" color="blue" fullWidth>
                        {t.login}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;