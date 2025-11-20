import { useState, useEffect } from 'react';

import { SearchBar } from '../components/SearchBar.jsx'
import { SearchFilters } from '../components/SearchFilters.jsx'
import { SearchResults } from '../components/SearchResults.jsx'

const API_URL = "http://localhost:3000"

export function SearchPage() {
  const urlParams = new URLSearchParams(window.location.search)

  const [query, setQuery] = useState(urlParams.get('q'))
  const [postData, setPostData] = useState([])
  const [filters, setFilters] = useState({})

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${API_URL}/queryposts/${query}`
      );
      const data = await response.json();
      setPostData(data);
    }
    fetchData()
  }, [postData]);

  return (
      <>
        <h2>"{query}" Search Results</h2>
        <SearchBar setQuery={setQuery} />
        <SearchFilters setFilters={setFilters} />
        <SearchResults resultData={postData} filters={filters} />
      </>
  )
}
