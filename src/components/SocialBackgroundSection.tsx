
import BackgroundGallery, { BackgroundImage } from './BackgroundGallery';

interface SocialBackgroundSectionProps {
  children: React.ReactNode;
  className?: string;
  images?: BackgroundImage[];
  id?: string;
}

const SocialBackgroundSection = ({ 
  children, 
  className = "", 
  images,
  id
}: SocialBackgroundSectionProps) => {
  // Use a subset of images focused on hipsters and mature drinkers
  const hipsterAndMatureImages: BackgroundImage[] = [
    {
      url: "https://images.unsplash.com/photo-1559818454-1b46997bfe30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Hipster friends sampling craft beers at brewery",
    },
    {
      url: "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Craft beer tasting event with diverse group",
    },
    {
      url: "https://images.unsplash.com/photo-1570034521972-575d4af5bcf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Mature friends enjoying quality beer together",
    }
  ];

  return (
    <BackgroundGallery 
      className={`py-16 ${className}`}
      images={images || hipsterAndMatureImages}
      interval={8000}
      overlay={true}
      overlayClass="bg-black/70"
      id={id}
    >
      <div className="container mx-auto px-4 social-image-container">
        {children}
      </div>
    </BackgroundGallery>
  );
};

export default SocialBackgroundSection;
