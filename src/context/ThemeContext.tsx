import {
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextInterface {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextInterface | undefined>(
  undefined,
);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
