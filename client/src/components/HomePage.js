import React from 'react';

// eslint-disable-next-line react/prop-types
function HomePage({ handleSignup, handleLogin }) {
  return (
    <>
        <div id="gif" >       
          <img src="media/bird.gif" alt="Relaxing Gif" />
        </div>
        <p id="source">GIF Source: <a href="https://www.reddit.com/r/gifs/comments/gnja95/calming_animation_i_did_for_school/"> Click</a></p>
    </>
  );
}

export default HomePage;
