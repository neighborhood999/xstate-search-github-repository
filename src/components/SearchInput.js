import React, { useContext, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/core';

import StateMachineContext from '../contexts/FSMContext';
import { handleResponse, searchGithubRepos } from '../utils/api';

function SearchInput() {
  const { state, send } = useContext(StateMachineContext);
  const keywordRef = useRef(null);
  const inputRef = useRef(null);

  const isDisabled = state.value.fetch === 'pending';

  const handleSearch = async () => {
    const keyword = inputRef.current.value;
    const ctxKeyword = keywordRef.current;

    if (keyword === '' || keyword === ctxKeyword) return;

    send({ type: 'RESET_RESULT', keyword });
    send('FETCH');

    try {
      const data = await searchGithubRepos({
        page: state.context + 1,
        q: keyword
      });

      const repos = handleResponse(data);

      send({ type: 'RESOLVE', repos, totalCount: data.total_count });
    } catch (err) {
      send('REJECT');
      console.error(err);
    }
  };

  useEffect(() => {
    keywordRef.current = state.context.keyword;
  }, [state.context]);

  useEffect(() => {
    const input = inputRef.current;

    const inputCllback = () => send({ type: 'TYPING' });

    const keyDownCallback = async event => {
      const key = event.keyCode || event.which;

      if (key === 13) {
        input.blur();
        await handleSearch();
      }
    };

    input.focus();
    input.addEventListener('input', inputCllback);

    input.addEventListener('keydown', keyDownCallback);

    return () => {
      input.removeEventListener('input', inputCllback);
      input.addEventListener('keydown', keyDownCallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex justifyContent="center" my={3}>
      <InputGroup width={['100%', '75%', '50%']}>
        <Input
          ref={inputRef}
          type="text"
          autoFocus
          borderColor={state.value.fetch === 'failure' ? 'red.500' : 'gray.300'}
          placeholder="Search..."
          isDisabled={isDisabled}
        />

        <InputRightElement width="3.5rem">
          <Button size="sm" onClick={handleSearch} isDisabled={isDisabled}>
            🔍
          </Button>
        </InputRightElement>
      </InputGroup>

      {state.value.fetch === 'failure' && (
        <Box ml={2}>
          <Button
            variantColor="red"
            onClick={async () => {
              send('RETRY');
              await handleSearch();
            }}
          >
            Retry
          </Button>
        </Box>
      )}
    </Flex>
  );
}

export default SearchInput;
