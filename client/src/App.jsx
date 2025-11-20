import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { SignedIn, SignedOut, SignInButton, SignOutButton, useAuth } from '@clerk/clerk-react'

import { HomePage } from './pages/HomePage.jsx';
import { SearchPage } from './pages/SearchPage.jsx';
import { CreatePage } from './pages/CreatePage.jsx';

const API_URL = "http://localhost:3000"

export default function App() {
  const [username, setUsername] = useState('')
  const { userId } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (userId == undefined) {
        return;
      }

      const response = await fetch(
        `${API_URL}/usernamefromid/${userId}`
      );
      const data = await response.json();
      setUsername(data);
    }
    fetchData();
  }, [userId]);

  return (
    <BrowserRouter>
      <h1>
        <Link to='/'>Community Cookbook</Link>
      </h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <p>Signed in as <b>{username}</b></p>
        <SignOutButton />
      </SignedIn>

      <hr/>

      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/search' element={ <SearchPage /> } />
        <Route path='/create' element={ <CreatePage /> } />
      </Routes>
    </BrowserRouter>
  )
}
