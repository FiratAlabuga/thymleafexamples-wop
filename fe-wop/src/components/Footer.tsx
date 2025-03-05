import { useTranslation } from '../context/LanguageContext';
import {translations} from "../constants/translations.ts";

const Footer = () => {
    const { language } = useTranslation();
    const t = translations[language];

    return (
        <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; 2023 Work Order Management. {t.allRightsReserved}</p>
        </footer>
    );
};

export default Footer;