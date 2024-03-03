import React, { useState } from 'react';

function SleepInfo() {

    return (
    <>
      <h2>Chronotypes:</h2>
  <p>Chronotypes are natural preferences of the body for wakefulness and sleep. An individual’s chronotype is influenced by genetics and driven by their circadian rhythm. Chronotypes affect sleep as well as performance and activity throughout the day. Adapting to one’s natural chronotype can improve your sleep quality, energy, and mood.</p>

  <h3>Determinants of Chronotype:</h3>
  <ul>
    <li>Strong genetic component.</li>
    <li>Longer allele on the PER3 circadian clock gene linked to morningness.</li>
    <li>Evolutionary theory suggests chronotype variation as a survival technique in hunter-gatherers.</li>
  </ul>

  <h3>Research Tools for Chronotype:</h3>
  <ul>
    <li>Scientists use questionnaires to categorize morningness vs. eveningness.</li>
    <li>Popular questionnaires: Morning-Eveningness Questionnaire (MEQ) and Munich ChronoType Questionnaire (MCTQ).</li>
    <li>Dr. Michael Breus's online quiz identifies four animal-based chronotypes: bear, wolf, lion, and dolphin.</li>
  </ul>

  <h3>Factors Influencing Chronotype:</h3>
  <ul>
    <li>Varies with genetics, age, geographical location, and other factors.</li>
    <li>Consider sleeping preferences, energy levels, meal timing, and circadian rhythm for self-assessment.</li>
  </ul>

  <h3>Chronotypes:</h3>

  <h4>Lion Chronotype:</h4>
  <ul>
    <li>Early birds, wake up early, and productive in the morning.</li>
    <li>May struggle with social schedules in the evenings.</li>
    <li>Personality traits: Conscientiousness and agreeableness.</li>
    <li>Wake up early: 5 AM</li>
    <li>Bed time: 9 PM</li>
    <li>Most productive: 8 AM - 12 PM</li>
  </ul>

  <h4>Bear Chronotype:</h4>
  <ul>
    <li>Intermediate chronotype, follows the sun.</li>
    <li>55% of the population.</li>
    <li>Adapts well to traditional office hours and maintains a social life in the evenings.</li>
    <li>Wake up: 7 AM</li>
    <li>Bed time: 11 PM</li>
    <li>Most productive: 10 AM - 2 PM</li>
  </ul>

  <h4>Wolf Chronotype:</h4>
  <ul>
    <li>Night owls, go to bed late.</li>
    <li>Approximately 15% of the population.</li>
    <li>Personality traits: Neuroticism and openness.</li>
    <li>Wake up: 9 AM</li>
    <li>Bed time: 12 AM</li>
    <li>Most productive: 1 PM - 5 PM</li>
  </ul>

  <h4>Dolphin Chronotype:</h4>
  <ul>
    <li>Described as insomniacs.</li>
    <li>Named after real dolphins' ability to stay alert while sleeping.</li>
    <li>10% of the population</li>
    <li>Wake up: 6 AM</li>
    <li>Bed time: 11 PM</li>
    <li>Most productive: 3 PM - 7 PM</li>
  </ul>
    </>
  );
}

export default SleepInfo;