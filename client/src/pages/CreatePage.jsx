import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react'

import { API_URL, CHECK_ON } from '../values.js';

export function CreatePage() {
  const { userId } = useAuth();

  async function submitPost(formData) {
    const title = formData.get('title');
    const content = formData.get('content');
    const ingredients = formData.get('ingredients');
    const vegeta = (formData.get('vegeta') == CHECK_ON);
    const vegan = (formData.get('vegan') == CHECK_ON);
    const glutenfree = (formData.get('glutenfree') == CHECK_ON);
    const lactosefree = (formData.get('lactosefree') == CHECK_ON);

    fetch(`${API_URL}/post/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: userId,
        title: title,
        content: content,
        ingredients: ingredients,
        isvegeta: vegeta,
        isvegan: vegan,
        isglutenfree: glutenfree,
        islactosefree: lactosefree
      })
    });
  }

  return (
      <>
        <SignedOut>
          <p>Please sign in before attempting to create a post</p>
        </SignedOut>
        <SignedIn>
          <form action={submitPost}>
            <h2>New Post</h2>
            <div>
              Title:<br/>
              <input name="title" size="40" /><br/>
              Ingredients:<br/>
              <textarea rows="10" cols="50" name="ingredients" /><br/>
              Content:<br/>
              <textarea rows="10" cols="50" name="content" /><br/>
              Dietary notes:<br/>
              <label><input name="vegeta" type="checkbox" /> Vegetarian</label>
              <label> |<input name="vegan" type="checkbox" /> Vegan</label>
              <label> |<input name="glutenfree" type="checkbox" /> Gluten Free</label>
              <label> |<input name="lactosefree" type="checkbox" /> Lactose Free</label>
            </div>
            <br/>
            <button type="submit">Send</button>
          </form>
        </SignedIn>
      </>
  );
}
