import { useCallback, useRef, useContext, useEffect } from 'react';
import { useActor } from '@xstate/react';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useEventListener } from '@hooks/useEventListener';
import { useGlobalStateService } from '@machine/globalStateMachine';

export function SearchInput() {
  const inputRef = useRef<HTMLInputElement>();
  const githubRepoService = useGlobalStateService();
  const [state, send] = useActor(githubRepoService);

  const onSearch = useCallback(() => {
    const keyword = inputRef.current.value;

    if (keyword.trim() !== '' && keyword !== state.context.keyword) {
      send({ type: 'RESET_RESULT', keyword });
      send({ type: 'FETCH' });
    }
  }, [send, state.context.keyword]);

  function onKeydown(event) {
    const keyword = inputRef.current.value;

    if (event.keyCode === 13 && keyword !== '') {
      inputRef.current.blur();
      onSearch();
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEventListener('keydown', inputRef, onKeydown);

  return (
    <Flex justifyContent="center" my={3}>
      <InputGroup width={['100%', '50%']}>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          isDisabled={state.matches({ fetch: 'pending' })}
          borderColor={
            state.matches({ fetch: 'failure' }) ? 'red.500' : 'gray.300'
          }
          onInput={() => {
            if (state.matches('search.idle')) {
              send({ type: 'TYPING' });
            }
          }}
        />

        <InputRightElement width="3.5rem">
          <Button
            size="sm"
            isDisabled={state.matches({ fetch: 'pending' })}
            onClick={onSearch}
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
            color="red"
            onClick={() => {
              send({ type: 'RETRY' });
            }}
          >
            Retry
          </Button>
        </Box>
      )}
    </Flex>
  );
}
