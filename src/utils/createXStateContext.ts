import { createContext, useContext as useReactContext } from 'react';
import { InterpreterFrom, StateMachine } from 'xstate';

export function createXStateContext<
  TMachine extends StateMachine<any, any, any, any, any, any, any>,
>(machine: TMachine) {
  const context = createContext<InterpreterFrom<TMachine> | null>(null);

  const useContext = () => {
    const ctx = useReactContext(context);
    if (!ctx) {
      throw new Error(
        `use${machine.id}Context must be used inside ${machine.id}Provider`,
      );
    }
    return ctx;
  };

  return [context.Provider, useContext] as const;
}
