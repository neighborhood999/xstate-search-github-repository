import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Grid, Spinner } from '@chakra-ui/core';

import FSMContext from '../contexts/FSMContext';
import { PER_PAGE } from '../utils/api';

import Card from './Card';

function List() {
  const { state, send } = useContext(FSMContext);
  const [hasMore, setHasMore] = useState(false);
  const bottomBoundaryRef = useRef(null);

  useEffect(() => {
    if (
      state.context.page > 0 &&
      state.context.page * PER_PAGE < state.context.totalCount
    ) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [state.context]);

  useEffect(() => {
    if (!bottomBoundaryRef.current) return;

    const listener = entries => {
      const first = entries[0];

      if (first.isIntersecting && hasMore) {
        send('FETCH');
      }
    };

    const observer = new IntersectionObserver(listener);

    observer.observe(bottomBoundaryRef.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore]);

  if (state.context.repositories.length === 0) return null;

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

      {hasMore && (
        <Box ref={bottomBoundaryRef} d="flex" my={3} justifyContent="center">
          <Spinner size="lg" />
        </Box>
      )}
    </Box>
  );
}

export default List;
