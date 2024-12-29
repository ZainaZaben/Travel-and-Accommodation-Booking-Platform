import NavBar from "@/components/NavBar";
import IntroSection from "./component/IntroSection";
import SearchBar from "../SearchPage/component/SearchBar";
import FeaturedDeals from "./component/FeaturedDeals";
import styles from "./style.module.css";
import Footer from "@/components/Footer";
import RecentlyVisitedHotels from "./component/RecentlyVisitedHotels";
import TrendingDestinations from "./component/TrendingDestinations";

const Home = () => {
  return (
    <>
      <NavBar />
      <IntroSection />
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div className={styles.container}>
        <FeaturedDeals />
        <RecentlyVisitedHotels />
        <TrendingDestinations />
      </div>
      <Footer />
    </>
  );
};

export default Home;
