import { useEffect, useRef } from 'react';

export function useEventListener(eventName, element = window, handler) {
  const handlerRef = useRef();

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    function eventHandler(event) {
      return handlerRef.current(event);
    }

    element.addEventListener(eventName, eventHandler);

    return () => {
      element.removeEventListener(eventName, eventHandler);
    };
  }, [element, eventName]);
}
