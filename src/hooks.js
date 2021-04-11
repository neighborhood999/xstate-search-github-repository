import { useEffect, useRef } from 'react';

export function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true
}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => entry.isIntersecting && onIntersect()),
      {
        root: root?.current,
        rootMargin,
        threshold
      }
    );

    const el = target?.current;

    if (!el) return;

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.current, enabled]);
}

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
