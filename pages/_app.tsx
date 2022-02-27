import { useInterpret } from '@xstate/react';
import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import {
  globalStateMachine,
  GlobalStateProvider,
} from '@machine/globalStateMachine';
import type { AppProps } from 'next/app';

import theme from '../theme';

function App({ Component, pageProps }: AppProps) {
  const globalStateService = useInterpret(globalStateMachine);

  return (
    <GlobalStateProvider value={globalStateService}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalStateProvider>
  );
}

export default App;
