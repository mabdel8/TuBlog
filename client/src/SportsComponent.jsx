import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SportsComponent = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/sportsArticles.json');
        setArticles(response.data.sportsArticles);
      } catch (error) {
        console.error('Error fetching sports articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="sports-articles">
      <h2 className="font-bold text-lg p-1">Sports Articles</h2>
      <div className="articles-list">
        {articles.map((article, index) => (
          <div key={index} className="container bg-white shadow-md rounded-2xl p-5 my-2">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3 className="font-bold text-xl text-yellow-500">{article.title}</h3>
              <img src={article.url} alt={article.title} className="w-full h-auto mt-2 rounded-md"/>
            </a>
            <p className="font-bold text-gray-500">{article.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsComponent;
