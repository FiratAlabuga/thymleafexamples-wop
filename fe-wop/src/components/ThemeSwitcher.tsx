import { useTheme } from '../hooks/useTheme';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
};