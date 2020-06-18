import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

import theme from '../theme';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
