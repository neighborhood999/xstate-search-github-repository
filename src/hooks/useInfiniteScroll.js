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

    const listener = entries => {
      const first = entries[0];

      if (first.isIntersecting) {
        setPage(page => page + 1);
      }
    };

    const observer = new IntersectionObserver(listener);

    observer.observe(bottomBoundaryRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  return { page, bottomBoundaryRef };
}

export default useInfiniteScroll;
