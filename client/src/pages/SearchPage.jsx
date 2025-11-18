import { useState } from 'react';

import { SearchBar } from '../components/SearchBar.jsx'
import { SearchFilters } from '../components/SearchFilters.jsx'
import { SearchResults } from '../components/SearchResults.jsx'

export function SearchPage() {
  const [filters, setFilters] = useState({})

  return (
      <>
        <h2>Search</h2>
        <SearchBar />
        <SearchFilters setFilters={setFilters} />
        <SearchResults filters={filters} />
      </>
  )
}
