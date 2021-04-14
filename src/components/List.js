import { Box, Grid, Spinner } from '@chakra-ui/react';
import { useRef } from 'react';
import { useService } from '@xstate/react';

import { useIntersectionObserver } from '../hooks';

import Card from './Card';

// eslint-disable-next-line react/prop-types
function List({ service }) {
  const [state, send] = useService(service);
  const bottomBoundaryRef = useRef(null);

  const { repositories, hasMore } = state.context;

  useIntersectionObserver({
    target: bottomBoundaryRef,
    onIntersect: () => {
      if (hasMore) {
        send('FETCH');
      }
    },
  });

  if (repositories.length === 0) {
    return null;
  }

  return (
    <Box mt={4}>
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr));"
        gap={5}
        my={5}
        templateRows="auto"
      >
        {state.context.repositories.map(repo => (
          <Card key={repo.id} repo={repo} />
        ))}
      </Grid>

      <Box
        ref={bottomBoundaryRef}
        display="flex"
        my={7}
        justifyContent="center"
      >
        {state.matches({ fetch: 'pending' }) && <Spinner size="lg" />}
      </Box>
    </Box>
  );
}

export default List;
