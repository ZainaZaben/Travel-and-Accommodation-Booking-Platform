/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import SearchBar from "./component/SearchBar";
import NavBar from "@/components/NavBar";
import SearchResult from "./component/SearchResult";
import styles from "./style.module.css";
import SearchFilters from "./component/SearchFilters";
import Footer from "@/components/Footer";

interface Filters {
  [key: string]: any;
}

const SearchPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});

  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters);
  };


  return (
    <div>
      <NavBar />
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <SearchFilters onFilter={handleFilter} />
          <SearchResult filters={filters} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
