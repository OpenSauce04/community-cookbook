import { useState, useEffect } from 'react';

const API_URL = "http://localhost:3000"

function generateIndicator(value, string) {
  if (value === true) {
    return `${string}:✅ `;
  } else {
    return `${string}:❌ `;
  }
}

function Result({ postId, userId, title, ingredients, content, filters, isVegeta=false, isVegan=false, isGlutenfree=false, isLactosefree=false }) {
  const [username, setUsername] = useState([])

  const {filterVegeta, filterVegan, filterGlutenfree, filterLactosefree} = filters;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${API_URL}/usernamefromid/${userId}`
      );
      const data = await response.json();
      setUsername(data);
    }
    fetchData()
  }, []);

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
      <hr/>
      <h2>{title}</h2>
      <h4>By {username}</h4>
      <div>
        {generateIndicator(isVegeta, 'Vegetarian')}
        {generateIndicator(isVegan, 'Vegan')}
        {generateIndicator(isGlutenfree, 'Gluten Free')}
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
    </div>
  );
}

export function SearchResults({ resultData, filters }) {
  if (resultData.length == 0) {
    return (
      <>
        <hr/>
        <p>No results.</p>
      </>
    )
  }

  return (
    <div>
      {resultData.map((result) => {
        return <Result
                 key={result.id}
                 postId={result.id}
                 userId={result.userid}
                 title={result.title}
                 ingredients={result.ingredients}
                 content={result.content}
                 isVegeta={result.isvegeta}
                 isVegan={result.isvegan}
                 isGlutenfree={result.isglutenfree}
                 isLactosefree={result.islactosefree}
                 filters={filters} />;
      })}
    </div>
  );
}
