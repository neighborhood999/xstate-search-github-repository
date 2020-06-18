import React from 'react';
import { useMachine } from '@xstate/react';

import Container from '../src/components/Container';
import FSMContext from '../src/contexts/FSMContext';
import Hero from '../src/components/Hero';
import List from '../src/components/List';
import Meta from '../src/components/Meta';
import SearchInput from '../src/components/SearchInput';
import { machine } from '../src/machine';

function IndexPage() {
  const [state, send] = useMachine(machine);

  return (
    <FSMContext.Provider value={{ state, send }}>
      <Meta />

      <Container>
        <Hero />

        <SearchInput />

        <List />
      </Container>
    </FSMContext.Provider>
  );
}

export default IndexPage;
