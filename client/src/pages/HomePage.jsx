import { Link } from "react-router";

import { SearchBar } from '../components/SearchBar.jsx'

export function HomePage() {
  return (
      <>
        <h2>Find Recipes</h2>
        <SearchBar />
        <h2>Share New Recipe</h2>
        <button>
          <Link to='/create'>Create Post</Link>
        </button>
      </>
  )
}
