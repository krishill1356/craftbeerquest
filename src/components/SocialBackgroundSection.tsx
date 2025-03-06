
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
      url: "/social-drinking-hipster.jpg",
      alt: "Hipster friends sampling craft beers at brewery",
    },
    {
      url: "/craft-beer-tasting.jpg",
      alt: "Craft beer tasting event with diverse group",
    },
    {
      url: "/social-drinking-mature.jpg",
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
