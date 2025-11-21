import { useState, useEffect } from 'react';

import { Post } from './Post.jsx';

export function SearchResults({ resultData, filters }) {
  if (resultData == -1) {
    return;
  }

  if (resultData.length == 0) {
    return (
      <>
        <p>No results.</p>
      </>
    );
  }

  return (
    <div>
      {resultData.map((result) => {
        return <Post
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
