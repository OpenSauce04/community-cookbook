import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post.jsx';

import { API_URL } from '../values.js';

export function PostPage() {
  const [postData, setPostData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${API_URL}/post/${id}`
      );
      const data = await response.json();
      setPostData(data);
    }
    fetchData();
  }, []);

  return (
      <>
        <Post
            postId={postData.id}
            userId={postData.userid}
            title={postData.title}
            ingredients={postData.ingredients}
            content={postData.content}
            isVegeta={postData.isvegeta}
            isVegan={postData.isvegan}
            isGlutenfree={postData.isglutenfree}
            isLactosefree={postData.islactosefree}
        />
      </>
  )
}
