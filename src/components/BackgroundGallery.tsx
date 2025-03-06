
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
  id?: string; // Add the id prop
}

const BackgroundGallery = ({
  className = "",
  images = socialDrinkingImages,
  interval = 7000,
  overlay = true,
  overlayClass = "bg-gradient-to-b from-black/60 via-black/30 to-black/60",
  children,
  id // Include id in destructuring
}: BackgroundGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        />
      ))}
      
      {overlay && <div className={`absolute inset-0 ${overlayClass} z-[1]`}></div>}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundGallery;
