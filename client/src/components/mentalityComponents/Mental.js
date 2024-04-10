import React, { useState } from 'react';
import './Mentality.css';

function Mental() {

    return (
    <section id="mentality-container">
      <div>
      <h1> Mental Health </h1>
      <h3> What&apos;s the relationship between mental health and sleep? </h3>
      <p>
        There are cycles during sleep, these consist of REM and Non-REM sleep. 
        REM sleep is closely related to mentality. 

        During REM (rapid eye movement) stage, the brain processes emotional information. 
        Sleep is important since it is when the brain works on evaluating and remembering thoughts and memories. 
        Without sleep, we would not be able to consolidate positive emotions as well. This is why someone&apos;s 
        mood can be negatively affected with lack of sleep and why mental health can worsen as a result too. 
        <br></br>
        <br></br>
        Not only that, according to research, there is a bidirectional relationship between sleep and mental health which is why they are said to be closely related. This means that lack of sleep may affect mental health negatively and bad mental health may affect someone&apos;s sleep negatively. Sleeping problems can thus be both a cause and consequence of mental health issues. There is still more research to be done on the topic though

        <br></br>
        <br></br>
        If there are bad issues for sleep as a result of mental health, or bad mental health as a result of sleep, it is good to consult a professional to try to get to the root of the problem and find a solution for it. Everyone&apos;s situation is different so the best solution can also greatly differ as well
      </p>

      <h3> Different solutions to improve sleep and mental health include: </h3>

      <h4> Controlled deep-breathing </h4>
      <ul>
        <li> By slowing your heart rate, your blood pressure gets reduced and your body becomes more relaxed </li>
        <li> Different techniques exist for this </li>
      </ul>

      <h4> Meditation </h4>
      <ul>
        <li>This helps calm the body and the mind so that someone can go to sleep with more ease</li>
        <li>According to research, this can even change the structure of the brain positively</li>
      </ul>

      <h4> Visualization </h4>
      <ul>
        <li>This is similar to counting sheep except you can imagine anything you would like and you don&apos;t need to count! </li>
        <li> You have to think about calming places or anywhere you would be at ease. Picturing small details about such a place can put you at ease and also ease sleep</li>
      </ul>

      <h4> Progressive muscle relaxation </h4>
      <ul>
        <li> The title says it all. You need to tense and relax different muscle groups in order from your head to your feet. </li>
        <li>The trick is to hold a tensed up for ten seconds while breathing in and then suddenly relaxing the muscle. </li>
      </ul>

      <p>
        For exercises to help out with sleep you can consult the support page in the sleep section here!
      </p>

      <p>
        <b>DISCLAIMER:</b> It is best to receive professional advice when it comes to these matters, the following information is only what was found out according to research. Sources can be found below
      </p>
      </div>
    </section>
  );
}


function MentalityPageFooter() {
  return (
    <div id="footer-content">
      <h3>420-620-DW Web Development Project</h3>
      <p>By: Hooman Afshari, Sila Ben Khelifa, Ashley Vu and Farhan Khandaker</p>
      <div id="sources">
        <h3>Sources & Attributions:</h3>
        <div id="source-columns">
          <div id="source-col-1">
            <ul>
              <li><a target="_blank" rel="noreferrer" href="https://www.sleepfoundation.org/mental-health"> Mental Health and Sleep </a></li>
              <li><a target="_blank" rel="noreferrer" href="https://www.columbiapsychiatry.org/news/how-sleep-deprivation-affects-your-mental-health"> How Sleep Deprivation Impacts Mental Health | Columbia University Department of Psychiatry </a></li>
              <li><a target="_blank" rel="noreferrer" href="https://www.cnn.com/2022/03/13/health/mental-tricks-for-sleep-wellness/index.html"> How to fall asleep faster with these mental tricks to calm your mind | CNN </a></li>
            </ul>
          </div>
          <div id="source-col-2">
            <ul>
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



export {Mental, MentalityPageFooter};