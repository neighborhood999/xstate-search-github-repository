import { useEffect, useRef, useState } from 'react';

function useInfiniteScroll({ hasMore, initialLoaded = false, reset = false }) {
  const bottomBoundaryRef = useRef(null);
  const initalPage = initialLoaded ? 1 : 0;
  const [page, setPage] = useState(initalPage);

  useEffect(() => {
    if (initialLoaded) {
      setPage(initalPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  useEffect(() => {
    if (!bottomBoundaryRef.current || !hasMore) return;

    let previousY;
    let previousRatio = 0;

    const listener = entries => {
      entries.forEach(
        ({ isIntersecting, intersectionRatio, boundingClientRect }) => {
          const { y } = boundingClientRect;

          if (
            isIntersecting &&
            intersectionRatio >= previousRatio &&
            (!previousY || y < previousY)
          ) {
            setPage(page => page + 1);
          }

          previousY = y;
          previousRatio = intersectionRatio;
        }
      );
    };

    const observer = new IntersectionObserver(listener);

    observer.observe(bottomBoundaryRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  return { page, bottomBoundaryRef };
}

export default useInfiniteScroll;
