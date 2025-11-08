import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

/**
 * Hook để detect khi element vào viewport
 * Useful cho lazy loading images
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '50px', enabled = true } = options;
  const elementRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Nếu browser không support Intersection Observer, load ngay
    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        
        // Once intersected, keep the state
        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, enabled, hasIntersected]);

  return { elementRef, isIntersecting, hasIntersected };
};

