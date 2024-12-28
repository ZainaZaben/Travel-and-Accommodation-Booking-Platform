import { useEffect, useState } from "react";
import styles from "./style.module.css";
import useGetFeaturedDeals from "./hooks/useGetFeaturedDeals";
import DealCard from "./DealCard";
import SkeletonDealCard from "./SkeletonDealCard";
import { Response } from "./api/types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedDeals: React.FC = () => {
  const { data: deals, isLoading } = useGetFeaturedDeals();
  const [error, setError] = useState<string | null>(null);
  const [slidesToShow, setSlidesToShow] = useState<number>(1);

  useEffect(() => {
    if (!isLoading && !deals) {
      setError("Failed to fetch deals. Please try again later.");
    }
  }, [isLoading, deals]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setSlidesToShow(1);
      } else if (windowWidth >= 768 && windowWidth <= 1000) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    adaptiveHeight: true,
    slidesToShow: slidesToShow,
    autoplay: true,
  };

  return (
    <div className={styles.featuredDealsContainer}>
      <h2> Featured Deals </h2>
      {error && <p>Something went wrong. Please try again later.</p>}

      {isLoading ? (
        <Slider {...settings}>
          {[1, 2, 3].map((_, index) => (
            <SkeletonDealCard key={index} />
          ))}
        </Slider>
      ) : (
        <div style={{ marginTop: "2rem", cursor: "pointer" }}>
          <Slider {...settings}>
          {deals?.map((deal: Response) => (
              <DealCard key={deal.hotelId} deal={deal} />
            ))}
          </Slider>
        </div>
      )}

    </div>
  );
};

export default FeaturedDeals;
