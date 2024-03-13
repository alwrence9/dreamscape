import React from 'react';

function HomePage({ handleSignup, handleLogin }) {
  return (
    <section>
      <div id="gif" >       
        <img src="media/bird.gif" alt="Relaxing Gif" />
      </div>
    </section>
  );
}

function HomePageFooter() {
  return (
    <div id="footer-content">
      <h3>420-620-DW Web Development Project</h3>
      <p>By: Hooman Afshari, Sila Ben Khelifa, Ashley Vu and Farhan Khandaker</p>
      <div id="sources">
        <h3>Sources & Attributions:</h3>
        <div id="source-columns">
          <div id="source-col-1">
            <ul>
              <l1 className="source">GIF Source: <a target="_blank" href="https://www.reddit.com/r/gifs/comments/gnja95/calming_animation_i_did_for_school/"> Click</a></l1>
            </ul>
          </div>
          <div id="source-col-2">
            <ul>
              <l1 className="source"></l1>
            </ul>
          </div>
          <div id="source-col-3">
            <ul>
              <l1 className="source"></l1>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export {HomePage, HomePageFooter};
