import {
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextInterface {
  toggleTheme: () => void;
  theme: Theme;
}

export const ThemeContext =
  createContext<ThemeContextInterface | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useMyContext must be used within a MyContextProvider',
    );
  }
  return context;
};

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
