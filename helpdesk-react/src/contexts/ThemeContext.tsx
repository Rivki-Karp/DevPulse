import { createContext, useContext } from 'react';

interface ThemeContextType {
    toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within ThemeContext.Provider');
    }
    return context;
};
