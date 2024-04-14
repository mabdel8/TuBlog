import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {posts.map(post => (
        <div key={post._id} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px', width: '300px', borderRadius: '25px' }}>
          <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>Author: { post.author.username }</p>
          <small>Category: {post.category}</small>
        </div>
      ))}
    </div>
  );
};

export default Posts;
