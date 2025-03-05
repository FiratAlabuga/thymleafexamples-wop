import React from 'react';
import {AuthProvider} from './context/AuthContext';
import {LanguageProvider} from './context/LanguageContext';
import Login from '../src/pages/auth/Login'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <LanguageProvider>
                <Login />
                <ToastContainer /> {/* ToastContainer'ı buraya ekliyoruz */}
            </LanguageProvider>
        </AuthProvider>
    );
};
export default App;
