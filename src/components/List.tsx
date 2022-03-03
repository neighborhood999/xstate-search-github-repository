import { Box, Grid, Spinner } from '@chakra-ui/react';
import { useRef } from 'react';
import { useActor } from '@xstate/react';
import { useGlobalStateService } from '@machine/globalStateMachine';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { Card } from '@components/Card';

export function List() {
  const githubRepoService = useGlobalStateService();
  const [state, send] = useActor(githubRepoService);
  const boundaryRef = useRef(null);
  const { repositories, hasMore } = state.context;

  useIntersectionObserver({
    target: boundaryRef,
    enabled: hasMore,
    onIntersect: () => send({ type: 'FETCH' }),
  });

  return (
    <Box minHeight="100vh" mt={4}>
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr));"
        gap={5}
        my={5}
        templateRows="auto"
      >
        {repositories.length === 0
          ? null
          : repositories.map((repo) => <Card key={repo.id} {...repo} />)}
      </Grid>

      <Box
        ref={boundaryRef}
        display="flex"
        width="100%"
        my={7}
        justifyContent="center"
      >
        {state.matches({ fetch: 'pending' }) && <Spinner size="lg" />}
      </Box>
    </Box>
  );
}
