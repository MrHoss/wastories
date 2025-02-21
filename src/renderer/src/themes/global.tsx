// globalStyles.js
import { Global, useTheme } from '@emotion/react';

const GlobalStyles = () => {
  const theme = useTheme();
  return (
    <Global styles= { theme.styleOverrides } />
  );
};

export default GlobalStyles;