import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false); // Track user login state
  const [liked, setLiked] = useState(false); // Track whether the user has already liked

  useEffect(() => {
    // Check if user is logged in when component mounts
    const token = localStorage.getItem('isAuthenticated');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLike = () => {
    if (loggedIn && !liked) {
      setLikes(likes + 1);
      setLiked(true); // Set liked to true to prevent multiple likes
    } else if (!loggedIn) {
      // Redirect to login page if user is not logged in
      window.location.href = '/login';
    }
  };

  return (
    <div>
      <IconButton onClick={handleLike} disabled={liked}>
        {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
      <span>{likes}</span>
    </div>
  );
};

export default LikeButton;
