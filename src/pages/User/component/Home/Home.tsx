import NavBar from "@/components/NavBar";
import IntroSection from "./component/IntroSection";
import SearchBar from "../SearchPage/component/SearchBar";
import FeaturedDeals from "./component/FeaturedDeals";
import styles from "./style.module.css";
import Footer from "@/components/Footer";
import RecentlyVisitedHotels from "./component/RecentlyVisitedHotels";
import TrendingDestinations from "./component/TrendingDestinations";
import { dataTypes } from "../../types";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const handleFilter = (searchParams: dataTypes) => {
    navigate(`/search?${searchParams.toString()}`);
  };
  
  return (
    <>
      <NavBar />
      <IntroSection />
      <div className={styles.searchBar}>
        <SearchBar onFilter={handleFilter}/>
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
