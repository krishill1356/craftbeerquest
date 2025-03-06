
import { useEffect, useState } from "react";

export type BackgroundImage = {
  url: string;
  alt: string;
  position?: string;
};

// Collection of social drinking images
export const socialDrinkingImages: BackgroundImage[] = [
  {
    url: "/social-drinking-1.jpg",
    alt: "Group of friends enjoying craft beer at a bar",
    position: "center"
  },
  {
    url: "/social-drinking-2.jpg",
    alt: "Happy people toasting with beer glasses at outdoor gathering",
    position: "top center"
  },
  {
    url: "/social-drinking-hipster.jpg",
    alt: "Hipster friends sampling craft beers at brewery",
    position: "center"
  },
  {
    url: "/social-drinking-mature.jpg",
    alt: "Mature friends enjoying quality beer together",
    position: "center"
  },
  {
    url: "/craft-beer-tasting.jpg",
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
}

const BackgroundGallery = ({
  className = "",
  images = socialDrinkingImages,
  interval = 7000,
  overlay = true,
  overlayClass = "bg-gradient-to-b from-black/60 via-black/30 to-black/60",
  children
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
    <div className={`relative overflow-hidden ${className}`}>
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
