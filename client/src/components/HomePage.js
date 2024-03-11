import React from 'react';

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

function HomePageFooter() {
  return (
    <div id="footer-content">
      <h3>420-620-DW Web Development Project</h3>
      <p>By: Hooman Afshari, Sila Ben Khelifa, Ashley Vu and Farhan Khandaker</p>
      <div id="sources">
        <h3>Sources & Attributions</h3>
      </div>
    </div>
  );
}

export {HomePage, HomePageFooter};
