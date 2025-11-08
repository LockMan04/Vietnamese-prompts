import { useState, useEffect } from 'react';
import { Image } from 'lucide-react';
import type { Prompt } from '../types';

interface ImagePreviewProps {
  prompt: Prompt;
}

const ImagePreview = ({ prompt }: ImagePreviewProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [beforeImageLoaded, setBeforeImageLoaded] = useState(false);
  const [afterImageLoaded, setAfterImageLoaded] = useState(false);

  // Reset image loading state and flip state when prompt changes
  useEffect(() => {
    setImageLoaded(false);
    setBeforeImageLoaded(false);
    setAfterImageLoaded(false);
    setIsFlipped(false);
  }, [prompt.id]);

  // Determine which images are available
  const hasBefore = prompt.image_before && prompt.image_before.trim() !== '';
  const hasAfter = prompt.image_after && prompt.image_after.trim() !== '';
  const hasBoth = hasBefore && hasAfter;
  const hasOnlyAfter = !hasBefore && hasAfter;
  const hasNoImages = !hasBefore && !hasAfter;

  // Determine current image source
  const getCurrentImageSrc = () => {
    if (hasNoImages) return '/icon.png';
    if (hasOnlyAfter) return prompt.image_after;
    if (hasBoth) {
      return isFlipped ? prompt.image_after : prompt.image_before;
    }
    return '/icon.png';
  };

  // Determine current label
  const getCurrentLabel = () => {
    if (hasNoImages || hasOnlyAfter) return null;
    if (hasBoth) {
      return isFlipped ? 'Sau' : 'Trước';
    }
    return null;
  };

  // Handle image flip
  const handleImageClick = () => {
    if (hasBoth) {
      setIsFlipped(!isFlipped);
    }
  };

  // Check if we should show loading (only show if current visible image is not loaded)
  const shouldShowLoading = () => {
    if (hasNoImages) return false;
    if (hasOnlyAfter) return !imageLoaded;
    if (hasBoth) {
      return isFlipped ? !afterImageLoaded : !beforeImageLoaded;
    }
    return !imageLoaded;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
        <Image className="w-5 h-5 mr-2" />
        Hình ảnh minh họa
      </h3>
      <div className="relative">
        {/* Canvas Container with Flip Effect */}
        <div
          className={`relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 min-h-[300px] ${
            hasBoth ? 'cursor-pointer hover:shadow-lg transition-shadow duration-300' : ''
          }`}
          style={{
            perspective: '1000px',
          }}
          onClick={handleImageClick}
        >
          {/* Label for Before/After */}
          {getCurrentLabel() && (
            <div className="absolute top-2 left-2 z-10 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {getCurrentLabel()}
            </div>
          )}

          {/* Loading Spinner */}
          {shouldShowLoading() && (
            <div className="absolute inset-0 aspect-square flex items-center justify-center bg-gray-100 dark:bg-gray-700 z-0">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Image Container with 3D Flip Effect */}
          <div
            className="relative w-full"
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hasBoth && isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front Face - Before (or Only After or Default when not hasBoth) */}
            <div
              className="relative w-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                position: hasBoth ? 'relative' : 'static',
                width: '100%',
              }}
            >
              <img
                src={hasBoth ? prompt.image_before : getCurrentImageSrc()}
                alt={hasBoth ? `${prompt.title} - Trước` : prompt.title}
                className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
                  hasBoth
                    ? (beforeImageLoaded ? 'opacity-100' : 'opacity-0')
                    : (imageLoaded ? 'opacity-100' : 'opacity-0')
                }`}
                loading={hasBoth ? 'eager' : 'lazy'}
                style={{
                  display: hasBoth && !beforeImageLoaded ? 'none' : 'block',
                  width: '100%',
                  height: 'auto',
                }}
                onLoad={() => {
                  if (hasBoth) {
                    setBeforeImageLoaded(true);
                  } else {
                    setImageLoaded(true);
                  }
                }}
                onError={(e) => {
                  if (e.currentTarget.src !== '/icon.png') {
                    e.currentTarget.src = '/icon.png';
                    if (hasBoth) {
                      setBeforeImageLoaded(true); // Mark as loaded to show default image
                    } else {
                      setImageLoaded(true);
                    }
                  }
                }}
              />
            </div>

            {/* Back Face - After (only rendered when hasBoth) */}
            {hasBoth && (
              <div
                className="absolute inset-0 w-full"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  width: '100%',
                }}
              >
                <img
                  src={prompt.image_after}
                  alt={`${prompt.title} - Sau`}
                  className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
                    afterImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  style={{
                    display: !afterImageLoaded ? 'none' : 'block',
                    width: '100%',
                    height: 'auto',
                  }}
                  onLoad={() => setAfterImageLoaded(true)}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/icon.png') {
                      e.currentTarget.src = '/icon.png';
                      setAfterImageLoaded(true); // Mark as loaded to show default image
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Click hint for flip */}
          {hasBoth && (
            <div className="absolute bottom-2 right-2 z-10 bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
              👆 Click để xem {isFlipped ? 'trước' : 'sau'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;

