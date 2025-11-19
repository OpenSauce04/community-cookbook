import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'

import { HomePage } from './pages/HomePage.jsx';
import { SearchPage } from './pages/SearchPage.jsx';
import { CreatePage } from './pages/CreatePage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <h1>
        <Link to='/'>Community Cookbook</Link>
      </h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/search' element={ <SearchPage /> } />
        <Route path='/create' element={ <CreatePage /> } />
      </Routes>
    </BrowserRouter>
  )
}
