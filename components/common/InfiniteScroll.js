import { useEffect, useRef } from 'react';

const InfiniteScroll = ({ onReachBottom }) => {
  const bottomRef = useRef();

  const handleIntersect = (entries) => {
    if (entries[0].isIntersecting) {
      onReachBottom();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [bottomRef, onReachBottom]);

  return (
    <div ref={bottomRef} />
  );
};

export default InfiniteScroll;
