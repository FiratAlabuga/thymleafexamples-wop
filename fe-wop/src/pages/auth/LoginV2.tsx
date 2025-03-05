import React, {useState} from 'react';
import {HiOutlineLockClosed, HiOutlineUser} from 'react-icons/hi';
import {toast} from 'react-toastify';
import {useAuth} from "../../context/AuthContext.tsx";
import {useTranslation} from "../../context/LanguageContext.tsx";
import CustomInput from "../../components/CustomInput.tsx";
import CustomButton from "../../components/CustomButton.tsx";
import {Button} from "@material-tailwind/react";

const Login: React.FC = () => {
    const { login } = useAuth();
    const { language, setLanguage, t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            await login({ username: email, password });
            setLoading(false);
            toast.success(t('success'));
        } catch (error) {
            setError(t('error'));
            setLoading(false);
            toast.error(t('error'));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-200 to-pink-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{t('login')}</h2>

                <div className="space-y-6">
                    <div className="relative">
                        <CustomInput
                            label={t('username')}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10"
                        />
                        <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-6 h-6" />
                    </div>

                    <div className="relative">
                        <CustomInput
                            label={t('password')}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!error}
                            helperText={error}
                            className="w-full pl-10"
                        />
                        <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-6 h-6" />
                    </div>

                    <CustomButton
                        variant="gradient"
                        size="lg"
                        color="blue"
                        loading={loading}
                        onClick={handleLogin}
                        fullWidth
                        className="w-full"
                    >
                        {t('login')}
                    </CustomButton>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        {language === 'en' ? "Don't have an account? " : 'Hesabınız yok mu? '}
                        <a href="#" className="text-blue-500 hover:underline">
                            {language === 'en' ? 'Register' : 'Kayıt Olun'}
                        </a>
                    </p>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-300"
                        onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                    >
                        {language === 'en' ? 'Türkçe' : 'English'}
                    </button>
                </div>
                <Button variant={"filled"} size={"lg"} color={"blue"} loading placeholder={undefined}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Login

                </Button>
            </div>
        </div>
    );
};

export default Login;
