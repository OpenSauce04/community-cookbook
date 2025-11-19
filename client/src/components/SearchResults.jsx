function generateIndicator(value, string) {
  if (value === true) {
    return `${string}:✅ `;
  } else {
    return `${string}:❌ `;
  }
}

function Result({ postId, title, ingredients, content, filters, isVegeta=false, isVegan=false, isGlutenfree=false, isLactosefree=false }) {
  const {filterVegeta, filterVegan, filterGlutenfree, filterLactosefree} = filters;

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
  return (
    <div>
      {resultData.map((result) => {
        return <Result
                 postId={result.id}
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
