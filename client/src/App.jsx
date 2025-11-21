import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { SignedIn, SignedOut, SignInButton, SignOutButton, useAuth } from '@clerk/clerk-react'

import { HomePage } from './pages/HomePage.jsx';
import { SearchPage } from './pages/SearchPage.jsx';
import { CreatePage } from './pages/CreatePage.jsx';
import { PostPage } from './pages/PostPage.jsx';

import { API_URL } from './values.js';

export default function App() {
  const [username, setUsername] = useState('')
  const { userId } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (userId == undefined) {
        return;
      }

      const response = await fetch(
        `${API_URL}/user/namefromid/${userId}`
      );
      const data = await response.json();
      setUsername(data);
    }
    fetchData();
  }, [userId]);

  return (
    <BrowserRouter>
      <h1>
        <Link to='/' style={{color: 'black'}}><b>Community Cookbook</b></Link>
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
        <Route path='/post/:id' element={ <PostPage /> } />
      </Routes>
    </BrowserRouter>
  )
}
