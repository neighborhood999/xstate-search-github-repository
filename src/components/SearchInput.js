import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef } from 'react';
import { useService } from '@xstate/react';

import { useEventListener } from '../hooks';

// eslint-disable-next-line react/prop-types
function SearchInput({ service }) {
  const [state, send] = useService(service);
  const inputRef = useRef(null);
  const keywordRef = useRef(state.context.keyword);

  const handleSearchCallback = useCallback(() => {
    const keyword = inputRef.current.value;

    if (keyword === keywordRef.current) return;

    send({ type: 'RESET_RESULT', keyword });
    send('FETCH');
  }, [send]);
  const inputCallback = useCallback(() => send({ type: 'TYPING' }), [send]);
  const keyDownCallback = useCallback(
    event => {
      const input = inputRef.current;
      const key = event.keyCode || event.which;

      if (key === 13) {
        input.blur();
        handleSearchCallback();
      }
    },
    [handleSearchCallback]
  );

  useEffect(() => {
    keywordRef.current = state.context.keyword;
  }, [state.context]);
  useEventListener('input', inputRef.current, inputCallback);
  useEventListener('keydown', inputRef.current, keyDownCallback);

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
            onClick={handleSearchCallback}
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
              handleSearchCallback();
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
