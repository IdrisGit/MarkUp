import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { StyleFunctionProps } from '@chakra-ui/styled-system';

const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const styleConfig = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode('#FAFAFA', '#092635')(props),
    },
  }),
};

export const theme = extendTheme({
  config: themeConfig,
  styles: styleConfig,
});
