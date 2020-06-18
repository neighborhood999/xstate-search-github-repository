import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Grid, Spinner } from '@chakra-ui/core';

import FSMContext from '../contexts/FSMContext';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { PER_PAGE, handleResponse, searchGithubRepos } from '../utils/api';

import Card from './Card';

function List() {
  const resetRef = useRef(false);
  const { state, send } = useContext(FSMContext);
  const [hasMore, setHasMore] = useState(false);
  const { page, bottomBoundaryRef } = useInfiniteScroll({
    hasMore,
    initialLoaded: true,
    reset: resetRef.current
  });

  useEffect(() => {
    if (state.context.page === 0) {
      resetRef.current = true;
    } else {
      resetRef.current = false;
    }

    if (
      state.context.page !== 0 &&
      state.context.page * PER_PAGE < state.context.totalCount
    ) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [state.context]);

  useEffect(() => {
    (async () => {
      if (state.value.fetch === 'success') {
        send('FETCH');

        try {
          const data = await searchGithubRepos({
            page,
            q: state.context.keyword
          });

          const repos = handleResponse(data);

          send({ type: 'RESOLVE', repos, totalCount: data.total_count });
        } catch (err) {
          send('REJECT');
          console.error(err);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
