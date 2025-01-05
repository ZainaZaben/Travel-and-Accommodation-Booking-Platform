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
  const { data: deals, isLoading, isError } = useGetFeaturedDeals();
  const [slidesToShow, setSlidesToShow] = useState<number>(1);

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
      {isError && <p>Something went wrong. Please try again later.</p>}

      {isLoading ? (
        <Slider {...settings}>
          {[1, 2, 3].map((e) => (
            <SkeletonDealCard key={e} />
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
