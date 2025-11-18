function Result({ postId, filters, isVegeta = false, isVegan=false, isGlutenfree=false, isLactosefree=false }) {
  const {vegeta, vegan, glutenfree, lactosefree} = filters;

  const shouldShow = (!( // Mega ick
    (!isVegeta && vegeta) ||
    (!isVegan && vegan) ||
    (!isGlutenfree && glutenfree) ||
    (!isLactosefree && lactosefree)
  ))
  console.log(`${postId}: ${shouldShow}`)

  if (!shouldShow) {
    return;
  }

  return (
    <div>
      {/* TODO: Implement this */}
      {`Result for post ${postId}`}
    </div>
  );
}

export function SearchResults({ filters }) {
  return (
    <div>
      <Result postId={1} isVegeta={true} isVegan={true} filters={filters} />
      <Result postId={2} isVegan={true} filters={filters} />
      <Result postId={3} isGlutenfree={true} filters={filters} />
      <Result postId={4} isLactosefree={true} filters={filters} />
    </div>
  );
}
