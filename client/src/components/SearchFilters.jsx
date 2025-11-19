export function SearchFilters({ setFilters }) {
  async function updateFilters(event) {
    const form = event.target.closest('form'); // Ehhhhhh

    const vegeta = form.elements['filter-vegeta'].checked;
    const vegan = form.elements['filter-vegan'].checked;
    const glutenfree = form.elements['filter-glutenfree'].checked;
    const lactosefree = form.elements['filter-lactosefree'].checked;

    setFilters({
      filterVegeta: vegeta,
      filterVegan: vegan,
      filterGlutenfree: glutenfree,
      filterLactosefree: lactosefree
    })
  }

  return (
    <>
      <form>
        <label><input name="filter-vegeta" type="checkbox" onChange={updateFilters} /> Vegetarian</label>
        <label> |<input id="filter-vegan" type="checkbox" onChange={updateFilters} /> Vegan</label>
        <label> |<input id="filter-glutenfree" type="checkbox" onChange={updateFilters} /> Gluten Free</label>
        <label> |<input id="filter-lactosefree" type="checkbox" onChange={updateFilters} /> Lactose Free</label>
      </form>
    </>
  )
}
