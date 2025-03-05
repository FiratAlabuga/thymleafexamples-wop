import React, {JSX, useEffect} from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AddWorkOrder from './pages/workorder/AddWorkOrder';
import UpdateWorkOrder from './pages/workorder/UpdateWorkOrder';
import DeleteWorkOrder from './pages/workorder/DeleteWorkOrder';
import ListWorkOrder from './pages/workorder/ListWorkOrder';
import { useTheme } from './hooks/useTheme';
import { ROUTES } from './constants/routes';
import { ThemeProvider } from '@material-tailwind/react';
import ErrorBoundary from './error/ErrorBoundary';

const App = () => {
    const { theme } = useTheme();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <AuthProvider>
                    <LanguageProvider>
                        <Router>
                            <div className="flex flex-col min-h-screen">
                                <Routes>
                                    {/* Auth Routes */}
                                    <Route path={ROUTES.LOGIN} element={<Login />} />
                                    <Route path={ROUTES.REGISTER} element={<Register />} />

                                    {/* Protected Routes */}
                                    <Route
                                        path={ROUTES.HOME}
                                        element={
                                            <ProtectedRoute>
                                                <>
                                                    <Header />
                                                    <ListWorkOrder />
                                                    <Footer />
                                                </>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path={ROUTES.ADD_WORK_ORDER}
                                        element={
                                            <ProtectedRoute>
                                                <>
                                                    <Header />
                                                    <AddWorkOrder />
                                                    <Footer />
                                                </>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path={ROUTES.UPDATE_WORK_ORDER}
                                        element={
                                            <ProtectedRoute>
                                                <>
                                                    <Header />
                                                    <UpdateWorkOrder />
                                                    <Footer />
                                                </>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path={ROUTES.DELETE_WORK_ORDER}
                                        element={
                                            <ProtectedRoute>
                                                <>
                                                    <Header />
                                                    <DeleteWorkOrder />
                                                    <Footer />
                                                </>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path={ROUTES.LIST_WORK_ORDERS}
                                        element={
                                            <ProtectedRoute>
                                                <>
                                                    <Header />
                                                    <ListWorkOrder />
                                                    <Footer />
                                                </>
                                            </ProtectedRoute>
                                        }
                                    />

                                    {/* Default Route (Redirect to Login if not authenticated) */}
                                    <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
                                </Routes>
                            </div>
                        </Router>
                    </LanguageProvider>
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

// ProtectedRoute Component: Kullanıcı giriş yapmamışsa Login sayfasına yönlendirir
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return children;
};

export default App;