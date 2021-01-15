import React, { useContext, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

import StateMachineContext from '../contexts/FSMContext';

function SearchInput() {
  const { state, send } = useContext(StateMachineContext);
  const inputRef = useRef(null);
  const keywordRef = useRef(state.context.keyword);

  const handleSearch = () => {
    const keyword = inputRef.current.value;

    if (keyword === keywordRef.current) return;

    send({ type: 'RESET_RESULT', keyword });
    send('FETCH');
  };

  useEffect(() => {
    keywordRef.current = state.context.keyword;
  }, [state.context]);

  useEffect(() => {
    const input = inputRef.current;

    const inputCllback = () => send({ type: 'TYPING' });

    const keyDownCallback = event => {
      const key = event.keyCode || event.which;

      if (key === 13) {
        input.blur();
        handleSearch();
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
      <InputGroup width={['100%', '50%']}>
        <Input
          ref={inputRef}
          type="text"
          autoFocus
          borderColor={
            state.matches({ fetch: 'failure ' }) ? 'red.500' : 'gray.300'
          }
          placeholder="Search..."
          isDisabled={state.matches({ fetch: 'pending' })}
        />

        <InputRightElement width="3.5rem">
          <Button
            size="sm"
            onClick={handleSearch}
            isDisabled={state.matches({ fetch: 'pending' })}
          >
            <span role="img" aria-label="Search Repository">
              🔍
            </span>
          </Button>
        </InputRightElement>
      </InputGroup>

      {state.matches({ fetch: 'failure' }) && (
        <Box ml={2}>
          <Button
            variantColor="red"
            onClick={() => {
              send('RETRY');
              handleSearch();
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
