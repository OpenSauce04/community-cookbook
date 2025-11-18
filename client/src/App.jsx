import { BrowserRouter, Routes, Route } from 'react-router';

import { HomePage } from './pages/HomePage.jsx';
import { SearchPage } from './pages/SearchPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/search' element={ <SearchPage /> } />
      </Routes>
    </BrowserRouter>
  )
}
