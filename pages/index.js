import { useMachine } from '@xstate/react';

import Container from '../src/components/Container';
import Hero from '../src/components/Hero';
import List from '../src/components/List';
import Meta from '../src/components/Meta';
import SearchInput from '../src/components/SearchInput';
import { machine } from '../src/machine';

function IndexPage() {
  // eslint-disable-next-line no-unused-vars
  const [state, send, service] = useMachine(machine);

  return (
    <>
      <Meta />

      <Container>
        <Hero />

        <SearchInput service={service} />

        <List service={service} />
      </Container>
    </>
  );
}

export default IndexPage;
