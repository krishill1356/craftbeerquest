
import { useEffect, useState } from "react";

export type BackgroundImage = {
  url: string;
  alt: string;
  position?: string;
};

// Collection of social drinking images
export const socialDrinkingImages: BackgroundImage[] = [
  {
    url: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    alt: "Group of friends enjoying craft beer at a bar",
    position: "center"
  },
  {
    url: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    alt: "Happy people toasting with beer glasses at outdoor gathering",
    position: "top center"
  },
  {
    url: "https://images.unsplash.com/photo-1559818454-1b46997bfe30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    alt: "Hipster friends sampling craft beers at brewery",
    position: "center"
  },
  {
    url: "https://images.unsplash.com/photo-1570034521972-575d4af5bcf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    alt: "Mature friends enjoying quality beer together",
    position: "center"
  },
  {
    url: "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    alt: "Craft beer tasting event with diverse group",
    position: "center"
  }
];

interface BackgroundGalleryProps {
  className?: string;
  images?: BackgroundImage[];
  interval?: number;
  overlay?: boolean;
  overlayClass?: string;
  children?: React.ReactNode;
  id?: string;
}

const BackgroundGallery = ({
  className = "",
  images = socialDrinkingImages,
  interval = 7000,
  overlay = true,
  overlayClass = "bg-gradient-to-b from-black/60 via-black/30 to-black/60",
  children,
  id
}: BackgroundGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  // Preload images and track loading status
  useEffect(() => {
    const imagePromises = images.map((image, index) => {
      return new Promise<number>((resolve) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => resolve(index);
        img.onerror = () => {
          console.error(`Failed to load image: ${image.url}`);
          resolve(index);
        };
      });
    });

    // Mark each image as loaded when it completes
    imagePromises.forEach(promise => {
      promise.then(index => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      });
    });

    // Initialize the loading status array
    setImagesLoaded(new Array(images.length).fill(false));
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`} id={id}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundPosition: image.position || "center",
            zIndex: 0
          }}
          aria-hidden={index !== currentIndex}
        >
          {/* Fallback when image fails to load */}
          {!imagesLoaded[index] && (
            <div className="absolute inset-0 bg-beer-dark/80 flex items-center justify-center">
              <div className="animate-pulse bg-beer-amber/20 w-full h-full"></div>
            </div>
          )}
        </div>
      ))}
      
      {overlay && <div className={`absolute inset-0 ${overlayClass} z-[1]`}></div>}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundGallery;
