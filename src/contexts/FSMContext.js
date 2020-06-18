import { createContext } from 'react';

const FSMContext = createContext({
  state: {},
  send: () => ({})
});

FSMContext.displayName = 'FSMContext';

export default FSMContext;
