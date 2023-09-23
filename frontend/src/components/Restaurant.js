import React from 'react';
import { Link } from "react-router-dom";

const Restaurant = ({ restaurant }) => {
  // Check if the restaurant object exists
  if (!restaurant) {
    return null; // or return some placeholder content or an error message
  }

  // Destructure the properties from the restaurant object
  const { images, name, address, ratings, numOfReviews } = restaurant;

  // Check if the required properties exist before accessing them
  if (!images || !name || !address || !ratings || !numOfReviews) {
    return null; // or return some placeholder content or an error message
  }

  return (
    <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
      <div className='card p-3 rounded'>
        <Link
          to={`/eats/stores/${restaurant._id}/menus`}
          className="btn btn-block"
        >
          <img
            className='card-img-top mx-auto'
            src={images[0]?.url}
            alt={name}
          ></img>
        </Link>

        <div className='card-body d-flex flex-column'>
          <h5 className='card-title'>{name}</h5>
          <p className='rest_address'>{address}</p>

          <div className='ratings mt-auto'>
            <div className='rating-outer'>
              <div
                className='rating-inner'
                style={{ width: `${(ratings / 5) * 100}%` }}
              ></div>
            </div>

            <span id='no_of_reviews'>({numOfReviews} Reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
