import PropTypes from 'prop-types';
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

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default App;
