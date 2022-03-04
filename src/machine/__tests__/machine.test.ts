import { interpret } from 'xstate';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { globalStateMachine } from '../globalStateMachine';

const server = setupServer(
  rest.get('https://api.github.com/search/repositories', (req, res, ctx) => {
    return res(
      ctx.json({
        total_count: 1,
        incomplete_results: false,
        items: [
          {
            id: 1,
            forks_count: 1,
            node_id: 'node_id',
            name: 'react',
            html_url: 'html_url',
            stargazers_count: 1,
            language: 'JavaScript',
            description:
              'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
          },
        ],
      }),
    );
  }),
);

describe('globalStateMachine', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should transition `search` state', () => {
    const { initialState } = globalStateMachine;

    const transitionOne = globalStateMachine.transition(initialState, {
      type: 'TYPING',
    });
    expect(transitionOne.matches('search.keyword')).toBeTruthy();

    const transitionTwo = globalStateMachine.transition(transitionOne, {
      type: 'RESET_RESULT',
      keyword: 'react',
    });
    expect(transitionTwo.matches('search.idle')).toBeTruthy();
    expect(transitionTwo.context.keyword).toBe('react');
  });

  it('should transition `fetch` state', (done) => {
    const fetchService = interpret(globalStateMachine).onTransition((state) => {
      if (state.matches('fetch.success')) {
        expect(state.context.keyword).toBe('react');
        expect(state.context.repositories).toHaveLength(1);
        done();
      }
    });

    fetchService.start();
    fetchService.send({ type: 'TYPING' });
    fetchService.send({ type: 'RESET_RESULT', keyword: 'react' });
    fetchService.send({ type: 'FETCH' });
  });
});
