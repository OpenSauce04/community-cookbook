import { Link } from "react-router";

import { SearchBar } from '../components/SearchBar.jsx'

export function HomePage() {
  return (
      <>
        <SearchBar />
        <Link to='/create'>New Post</Link>
      </>
  )
}
