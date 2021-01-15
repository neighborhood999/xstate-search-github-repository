import PropTypes from 'prop-types';
import React from 'react';
import { CSSReset, ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default App;
