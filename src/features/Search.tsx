import React from "react";

import Results from "./Results";
import SearchForm from "./SearchForm";

/** The full search component. Contains a `SearchForm` and a `Results` components. */
const Search: React.FC<{}> = () => {
  return (
    <div>
      <h1>Search arXiv</h1>
      <SearchForm />
      <Results />
    </div>
  );
};
export default Search;
