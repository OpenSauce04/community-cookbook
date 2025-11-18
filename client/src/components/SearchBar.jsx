import { useNavigate } from 'react-router-dom';

export function SearchBar({ setQuery }) {
  const navigate = useNavigate();

  async function submitSearch(formData) {
    const content = formData.get('content');
    navigate(`/search?q=${content}`);
    setQuery(content);
  }

  return (
    <>
      <form action={submitSearch}>
        <input name="content" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
