import { useEffect, RefObject } from 'react';

interface Args extends IntersectionObserverInit {
  target: RefObject<Element>;
  enabled?: boolean;
  onIntersect: () => void;
}

export function useIntersectionObserver({
  target,
  onIntersect,
  enabled = true,
  root = null,
  threshold = 1,
  rootMargin = '0px',
}: Args) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onIntersect();
          }
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    const element = target?.current;

    if (!element) {
      return;
    }

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [enabled, root, rootMargin, threshold, target, onIntersect]);
}
