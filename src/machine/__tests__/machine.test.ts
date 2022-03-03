/* eslint-disable @typescript-eslint/no-var-requires */
import { globalStateMachine } from '../globalStateMachine';

describe('globalStateMachine', () => {
  it('should be passed', () => {
    expect(true).toBe(true);
  });

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
});
