import { BrowserRouter, Routes, Route, Link } from 'react-router';

import { HomePage } from './pages/HomePage.jsx';
import { SearchPage } from './pages/SearchPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <h1>
        <Link to='/'>Community Cookbook</Link>
      </h1>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/search' element={ <SearchPage /> } />
      </Routes>
    </BrowserRouter>
  )
}
