import React from 'react';
import './Diet.css';


function Diet() {

    return (
    <section id="diet-container">
      <div>
        <h1>Diet</h1>

        <h2>Why Food?</h2>
        <p>
          If you wish to improve your sleep, why not improve your diet first? 
          Sleepers often ignore the growing evidence that their diet has a significant impact on their sleep. 
          The National Center for Biotechnology Information found that a lack of calcium, magnesium, and vitamins affects the hormonal
          pathways involved in sleep. The study has also observed that people with a &quot;Mediterranian Diet&quot; have a higher quality sleep. 
          The study calrifies that this observation is descriptive and adopting the Mediterranian Diet may not be linked to better sleep.
        </p>

        <h2>What To Avoid Eating?</h2>
        <ul>
          <li>
            <h3>Fatty Or High-Protein Foods</h3>
            <p>
              Your digestion slows down while you sleep! 
              If you ate something fatty or high in protein, it can make your stomach feel full.
              This disrupts your sleep pattern and can lead you to feel less rested in the morning.
            </p>
          </li>
          <li>
            <h3>Spicy Foods</h3>
            <p>
              Spicy food can cause heartburn which makes it uncomfortable to lie down and fall asleep! 
              If you already have Obstructive Sleep Apnea, heartburn can worsen its effects.
              Eating spcicy food can also increase your body temperature, and feeling too hot can lead to a harder time falling alseep. 
            </p>
          </li>
          <li>
            <h3>Caffeine</h3>
            <p>
              Caffeine is a stimulant which makes you feel more awake. This effect also makes it much harder to fall asleep. 
              Caffeine is not just found in coffee or tea; it can also be present in chocolate bars and ice cream!
            </p>
          </li>
        </ul>

        <h2>What To Eat Instead?</h2>
        <ul>
          <li>
            <h3>Oatmeal or Whole-wheat</h3>
            <p>
              Complex-carbohydrates are easy to digest and can lead to reduced discomfort when eating before sleep.
              If you are the type to eat toast or cereal, consider options with these ingredients instead.
            </p>
          </li>
          <li>
            <h3>Bananas, Pineapples And Oranges</h3>
            <p>
              These fruits are were found by the National Center for Biotechnology Information to increase melatonin levels, which is the key hormone in sleep.
            </p>
          </li>
        </ul>

    </div>
  </section>
  );
}

function DietPageFooter() {
  return (
    <div id="footer-content">
      <h3>420-620-DW Web Development Project</h3>
      <p>By: Hooman Afshari, Sila Ben Khelifa, Ashley Vu and Farhan Khandaker</p>
      <div id="sources">
        <h3>Sources & Attributions:</h3>
        <div id="source-columns">
          <div id="source-col-1">
            <ul>
            <li>Sleep Foundation. Washington, DC, United States of America: <a target="_blank" rel="noreferrer" href="https://www.sleepfoundation.org/nutrition#:~:text=Growing%20evidence%20indicates%20that%20sufficient,be%20associated%20with%20sleep%20problems">Click</a></li>
            </ul>
          </div>
          <div id="source-col-2">
            <ul>
            <li>National Sleep Foundation. Arlington County, Virginia, United States of America: <a target="_blank" rel="noreferrer" href="https://www.thensf.org/the-link-between-nutrition-and-sleep/">Click</a></li>
            </ul>
          </div>
          <div id="source-col-3">
            <ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export {Diet, DietPageFooter};