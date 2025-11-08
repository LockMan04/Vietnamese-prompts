import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  fallback?: string;
  threshold?: number;
  rootMargin?: string;
  eager?: boolean; // Load ngay lập tức, không lazy
}

const LazyImage = ({
  src,
  alt,
  placeholder,
  fallback = '/icon.png',
  threshold = 0.1,
  rootMargin = '50px',
  eager = false,
  className = '',
  onLoad,
  onError,
  ...props
}: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    enabled: !eager, // Disable observer nếu eager
  });

  // Set image source khi element vào viewport hoặc eager
  useEffect(() => {
    if (eager || hasIntersected) {
      setImageSrc(src);
    }
  }, [src, hasIntersected, eager]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && imageSrc !== fallback) {
      setHasError(true);
      setImageSrc(fallback);
      setIsLoaded(true);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      ref={elementRef as React.RefObject<HTMLImageElement>}
      src={imageSrc || src}
      alt={alt}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      loading={eager ? 'eager' : 'lazy'}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

export default LazyImage;

