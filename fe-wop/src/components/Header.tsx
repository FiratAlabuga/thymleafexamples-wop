import { useTranslation } from '../context/LanguageContext';
import { Button } from './Button';
import { translations } from '../constants/translations';
import { useAuth } from '../context/AuthContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const Header = () => {
    const { token, logout } = useAuth();
    const { language, setLanguage } = useTranslation();
    const navigate = useNavigate();
    const t = translations[language];

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'tr' : 'en');
    };

    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Work Order Management</h1>
            <div className="flex items-center space-x-4">
                <ThemeSwitcher />
                <Button onClick={toggleLanguage}>
                    {language === 'en' ? 'TR' : 'EN'}
                </Button>
                {token && (
                    <>
                        <Button variant="primary" onClick={() => navigate(ROUTES.ADD_WORK_ORDER)}>
                            {t.addWorkOrder}
                        </Button>
                        <Button variant="danger" onClick={logout}>
                            {t.logout}
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;