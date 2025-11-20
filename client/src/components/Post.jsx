import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import { API_URL } from '../values.js';

function generateIndicator(value, string) {
  if (value === true) {
    return <>
             {string}:<span style={{color: 'green'}}>✓</span>
           </>;
  } else {
    return <>
             {string}:<span style={{color: 'red'}}>✗</span>
           </>;
  }
}

export function Post({
    postId,
    userId,
    title,
    ingredients,
    content,
    filters={filterVegeta: false, filterVegan: false, filterGlutenfree: false, filterLactosefree: false},
    isVegeta=false,
    isVegan=false,
    isGlutenfree=false,
    isLactosefree=false
}) {
  const [username, setUsername] = useState('')

  const {filterVegeta, filterVegan, filterGlutenfree, filterLactosefree} = filters;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${API_URL}/usernamefromid/${userId}`
      );
      const data = await response.json();
      setUsername(data);
    }
    fetchData();
  }, [userId]);

  const shouldShow = (!( // TW: Gross but necessary boolean spaghetti
    (!isVegeta && filterVegeta) ||
    (!isVegan && filterVegan) ||
    (!isGlutenfree && filterGlutenfree) ||
    (!isLactosefree && filterLactosefree)
  ));

  if (!shouldShow) {
    return;
  }

  return (
    <div>
      <Link to={`/post/${postId}`}>
        <h2>{title}</h2>
      </Link>
      <h4>By {username}</h4>
      <div>
        {generateIndicator(isVegeta, 'Vegetarian')}{' / '}
        {generateIndicator(isVegan, 'Vegan')}{' / '}
        {generateIndicator(isGlutenfree, 'Gluten Free')}{' / '}
        {generateIndicator(isLactosefree, 'Lactose Free')}
      </div>
      <h3>Ingredients</h3>
      <p className="respect-newlines">
        {ingredients}
      </p>
      <h3>Instructions</h3>
      <p className="respect-newlines">
        {content}
      </p>
      <hr/>
    </div>
  );
}
