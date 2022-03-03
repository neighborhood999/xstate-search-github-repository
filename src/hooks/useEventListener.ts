import { useEffect, useRef, RefObject } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  element: RefObject<T>,
  handler: (event: HTMLElementEventMap[K]) => void,
) {
  const handlerRef = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetEl: T | Window = element?.current || window;
    if (!(targetEl && targetEl.addEventListener)) {
      return;
    }

    function eventHandler(event) {
      return handlerRef.current(event);
    }

    targetEl.addEventListener(eventName, eventHandler);

    return () => {
      targetEl.removeEventListener(eventName, eventHandler);
    };
  }, [element, eventName]);
}
