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
        `${API_URL}/queryposts/`
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
        <SearchResults resultData={resultData} filters={filters} />
      </>
  )
}

const resultData = [
  {
    id: 1,
    title: 'Sausage Casserole',
    content: `This is a recipe.
    Line 1.
    Line 2.
    Etc.
    Blah blah.
    Blah.
    Etc etc`,
    isVegeta: false,
    isVegan: false,
    isGlutenfree: true,
    isLactosefree: true
  },
  {
    id: 2,
    title: 'Apple Pie',
    content: `This is a recipe.
    Line 1.
    Line 2.
    Etc.
    Blah blah.
    Blah.
    Etc etc`,
    isVegeta: true,
    isVegan: true,
    isGlutenfree: false,
    isLactosefree: true
  },
  {
    id: 3,
    title: 'Gluten-free Brownies',
    content: `This is a recipe.
    Line 1.
    Line 2.
    Etc.
    Blah blah.
    Blah.
    Etc etc`,
    isVegeta: true,
    isVegan: true,
    isGlutenfree: true,
    isLactosefree: true
  },
  {
    id: 4,
    title: 'Omelette',
    content: `This is a recipe.
    Line 1.
    Line 2.
    Etc.
    Blah blah.
    Blah.
    Etc etc`,
    isVegeta: true,
    isVegan: false,
    isGlutenfree: true,
    isLactosefree: true
  },
]
