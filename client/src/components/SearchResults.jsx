function generateIndicator(value, string) {
  if (value === true) {
    return `${string}:✅ `;
  } else {
    return `${string}:❌ `;
  }
}

function Result({ postId, title, content, filters, isVegeta = false, isVegan=false, isGlutenfree=false, isLactosefree=false }) {
  const {vegeta, vegan, glutenfree, lactosefree} = filters;

  const shouldShow = (!( // Mega ick
    (!isVegeta && vegeta) ||
    (!isVegan && vegan) ||
    (!isGlutenfree && glutenfree) ||
    (!isLactosefree && lactosefree)
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
                 content={result.content}
                 isVegeta={result.isVegeta}
                 isVegan={result.isVegan}
                 isGlutenfree={result.isGlutenfree}
                 isLactosefree={result.isLactosefree}
                 filters={filters} />;
      })}
    </div>
  );
}
