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