import React, { useState } from 'react';

const FoodSpotComponent = ({ foodSpots, user }) => {
  const [reviews, setReviews] = useState({});

  const handleReviewChange = (e, index) => {
    const { name, value } = e.target;
    setReviews(prevReviews => ({
      ...prevReviews,
      [index]: {
        ...prevReviews[index],
        [name]: value,
      },
    }));
  };

  const handleReviewSubmit = (index) => {
    if (reviews[index]?.text) {
      // Adding the new review along with the user to the reviews array of the specific food spot
      setReviews(prevReviews => ({
        ...prevReviews,
        [index]: {
          ...prevReviews[index],
          list: [...(prevReviews[index]?.list || []), { text: reviews[index].text, user }],
          text: '',
        },
      }));
    } else {
      alert('Please enter a review before submitting.');
    }
  };

  return (
    <div className="food-spots">
      <h2 className="font-bold text-lg p-1">Food Spots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {foodSpots.map((spot, index) => (
          <div key={index} className="container bg-white shadow-md rounded-2xl p-5">
            <h3 className="font-bold text-xl text-yellow-500">{spot.name}</h3>
            <p className="font-light text-gray-500">{spot.address}</p>
            <div className="flex space-x-2 mt-2">
              {spot.images.map((image, imgIndex) => (
                <img key={imgIndex} src={image} alt={spot.name} className="w-24 h-24 object-cover rounded-md"/>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="font-bold text-md text-gray-700">Add a Review:</h4>
              <textarea
                name="text"
                rows="2"
                className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Write your review..."
                value={reviews[index]?.text || ''}
                onChange={(e) => handleReviewChange(e, index)}
              ></textarea>
              <button
                onClick={() => handleReviewSubmit(index)}
                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Submit Review
              </button>
            </div>
            <div className="mt-4">
              <h4 className="font-bold text-md text-gray-700">Reviews:</h4>
              <ul>
                {reviews[index]?.list?.slice(-3).map((review, reviewIndex) => (
                  <li key={reviewIndex} className="text-gray-600">
                    <strong>{review.user}:</strong> {review.text.split(' ').slice(0, 5).join(' ')}...
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSpotComponent;
