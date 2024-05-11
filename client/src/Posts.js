import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://tu-blog-server.vercel.app/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='flex flex-col justify-center flex-wrap content-center gap-4 col-span-10 lg:col-span-8 xl:col-span-6 lg:px-16 mt-10'>
      {posts.map(post => (
        <div key={post._id} className='container bg-white shadow-md rounded-2xl p-5'>
          <Link to={`/article/${post._id}`}>
          <h1 className='font-bold text-xl text-yellow-500'>{post.title}</h1>
          </Link>
              <p className='font-light text-gray-500'>{post.content}</p>
              <p className='font-medium text-gray-700'>Author: { post.author.username }</p>
          <p className='mb-2'>Category: {post.category}</p>
          <textarea
                  id="post"
                  rows="1"
                  className="resize-none outline-none w-full px-0  text-gray-900 mt-2 bg-white border-0 block font-sans text-base antialiased font-light leading-relaxed text-inherit"
                  placeholder={`Add A Comment...`}
                                  required
                ></textarea>
        </div>
      ))}
    </div>
  );
};

export default Posts;
