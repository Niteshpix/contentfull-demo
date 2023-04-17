import React from "react";
import "./common.css";
import PropTypes from "prop-types";
import { FaStar, FaRegStar } from "react-icons/fa";

function Comment(props) {
  const { name, comment, rating } = props;

  const ratingValue = parseFloat(rating);
  return (
    <div className="comment">
      <div className="author">{name}</div>
      <div className="content">{comment}</div>
      <RatingCard rating={ratingValue} />
    </div>
  );
}

export const RatingCard = ({ rating }) => {
  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starIcons.push(<FaStar key={i} className="star checked" />);
    } else {
      starIcons.push(<FaRegStar key={i} className="star" />);
    }
  }

  return (
    <div className="rating-card">
      <div className="stars">{starIcons}</div>
      <div className="rating">{rating}</div>
    </div>
  );
};

RatingCard.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Comment;
