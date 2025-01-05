import React, { useState } from "react";
import SearchBar from "./component/SearchBar";
import NavBar from "@/components/NavBar";
import SearchResult from "./component/SearchResult";
import styles from "./style.module.css";
import SearchFilters from "./component/SearchFilters";
import Footer from "@/components/Footer";
import { dataTypes, Filter } from "@/pages/User/types";

const SearchPage: React.FC = () => {
  const [filters, setFilters] = useState<Filter>({} as Filter);
  const [searchBarFilters, setSearchBarFilters] = useState<dataTypes>(
    {} as dataTypes
  );

  const handleFilter = (newFilters: Filter) => {
    setFilters(newFilters);
  };

  const handleSearchBarFilters = (newFilters: dataTypes) => {
    setSearchBarFilters(newFilters);
  };

  return (
    <div>
      <NavBar />
      <div className={styles.searchBar}>
        <SearchBar onFilter={handleSearchBarFilters} />
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <SearchFilters onFilter={handleFilter} />
          <SearchResult filters={filters} searchData={searchBarFilters} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
