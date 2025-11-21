import { useState, useEffect } from 'react';

import { SearchBar } from '../components/SearchBar.jsx';
import { SearchFilters } from '../components/SearchFilters.jsx';
import { SearchResults } from '../components/SearchResults.jsx';

import { API_URL } from '../values.js';

export function SearchPage() {
  const urlParams = new URLSearchParams(window.location.search);

  const [query, setQuery] = useState(urlParams.get('q'));
  const [postData, setPostData] = useState(-1); // -1 indicates that the page is laoding
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${API_URL}/post/query/${query}`
      );
      const data = await response.json();
      setPostData(data);
    }
    fetchData();
  }, [query]);

  return (
      <>
        <h2>Search Results for "{query}"</h2>
        <SearchBar setQuery={setQuery} />
        <SearchFilters setFilters={setFilters} />
        <hr/>
        <SearchResults resultData={postData} filters={filters} />
      </>
  )
}
