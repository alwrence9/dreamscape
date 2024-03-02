/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';

function Diet() {

    return (
    <>
      <h1> Diet </h1>
      <h3>Why healthy diet?</h3>
      <p>Eating a healthy, balanced diet is one of the most important things you can do to protect 
        your health.<br></br> In fact, up to 80% of premature heart disease and stroke can be prevented 
        through your life choices <br></br> and habits, such as eating a healthy diet and being physically 
        active.
      </p>

      <h4>A healthy diet can help lower your risk of heart disease and stroke by:</h4>
      <ul className="infoLi">
        <li> Improving your cholesterol levels </li>
        <li> Reducing your blood pressure </li>
        <li> Helping you manage your body weight </li>
        <li> Controlling your blood sugar.</li>
      </ul>

      <h4>What does a healthy, balanced diet look like? </h4>
      <p>Canada’s Food Guide recommends eating a variety of healthy foods each day. <br></br> 
      This includes eating plant-based foods more often and choosing highly-processed <br></br> 
      or ultra-processed foods less often.
      </p>
      <h4>A healthy diet includes: </h4>
      <ol>
        <li>Eating lots of vegetables and fruit</li>
          <p> This is one of the most important diet habits. Vegetables and fruit <br></br>
          are packed with nutrients (antioxidants, vitamins, minerals and fibre) <br></br> 
          and help you maintain a healthy weight by keeping you full longer. <br></br>
          Fill half your plate with vegetables and fruit at every meal and snack. </p>
        <li>Choosing whole grain foods</li>
          <p>Whole grain foods include whole grain bread and crackers, brown or wild rice,<br></br>
           quinoa, oatmeal and hulled barley. They are prepared using the entire grain. <br></br> 
           Whole grain foods have fibre, protein and B vitamins to help you stay healthy <br></br>
           and full longer. Choose whole grain options instead of processed or refined <br></br> 
           grains like white bread and pasta. Fill a quarter of your plate with whole grain foods.</p>
        <li>Eating protein foods</li>
          <p>Protein foods include legumes, nuts, seeds, tofu, fortified soy beverage, fish, <br></br>
          shellfish, eggs, poultry, lean red meats including wild game, lower fat milk, <br></br> 
          lower fat yogurts, lower fat kefir and cheeses lower in fat and sodium. Protein helps <br></br>
          build and maintain bones, muscles and skin. Eat protein every day. Try to eat at least<br></br>
          two servings of fish each week, and choose plant-based foods more often. Dairy products<br></br> 
          are a great source of protein. Choose lower fat, unflavoured options. Fill a quarter of<br></br> 
          your plate with protein foods.</p>
        <li>Limiting highly and ultra-processed foods</li>
          <p>
          Highly processed foods — often called ultra-processed — are foods that are changed <br></br>
          from their original food source and have many added ingredients. During processing, <br></br>
          often important nutrients such as vitamins, minerals and fiber are removed while salt <br></br> 
          and sugar are added.  Examples of processed food include: fast foods, hot dogs, chips, <br></br> 
          cookies, frozen pizzas, deli meats, white rice and white bread. Some minimally processed <br></br>
          foods are okay. These are foods that are slightly changed in some way but contain few <br></br>
          industrially made additives. Minimally processed foods keep almost all of their essential <br></br>
          nutrients. Some examples are: bagged salad, frozen vegetables and fruit, eggs, milk, cheese,<br></br>
           flour, brown rice, oil and dried herbs. We are not referring to these minimally processed foods<br></br> 
           when we are advising you not to eat processed foods. Heart & Stroke funded research found <br></br> 
           that ultra-processed foods make up almost half of Canadians' diets. Read more about it here.
          </p>
        <li>Making water your drink of choice</li>
          <p>
          Water supports health and promotes hydration without adding calories to the diet. <br></br>
          Sugary drinks including energy drinks, fruit drinks, 100% fruit juice, soft drinks <br></br>
          and flavored coffees have lots of sugar and little to no nutritional value. <br></br>
          It is easy to drink empty calories without realizing, and this leads to weight gain.<br></br>
          Avoid fruit juice, even when it is 100% fruit juice. Although fruit juice has some of<br></br> 
          the benefits of the fruit (vitamins, minerals), it has more sugar than the fruit and <br></br>
          less fiber. Fruit juice should not be consumed as alternative to fruits. Canadians <br></br>
          should eat their fruits, not drink them. When safe drinking water is not available, <br></br> 
          quench your thirst with coffee, tea, unsweetened lower-fat milk, and previously boiled water. <br></br>
          Top 5 tips from the experts Prepare most of your meals at home using whole or minimally processed foods. <br></br> 
          Choose from a variety of different proteins to keep things interesting. Using catchy names for each day can help you plan. <br></br> 
          Try “Meatless Monday” with this meatless recipe. Make an eating plan each week – this is the key to fast, easy meal preparation.<br></br> 
          Check out our shopping tips here. Choose recipes with plenty of vegetables and fruit. <br></br> 
          Your goal is to fill half your plate with vegetables and fruit at every meal. <br></br> 
          Choose brightly coloured fruits and vegetables each day, especially orange and dark green vegetables (click here for more information). <br></br> 
          Frozen or canned unsweetened fruits and vegetables are a perfect alternative to fresh produce. Try this recipe. <br></br>
          Avoid sugary drinks and instead drink water. Lower-fat, unsweetened milk is also a good way to stay hydrated.<br></br>
           Keep a reusable water bottle in your purse or car so you can fill up wherever you are going. <br></br>
          Eat smaller meals more often. Eat at least three meals a day with snacks in between. <br></br>
          When you wait too long to eat you are more likely to make unhealthy food choices. Keep easy-to-eat snacks (like this) <br></br> 
          in your purse or bag for emergencies.
          </p>
      </ol>
      <h3>Healthy Eating Plate</h3>
      <p>Use the Healthy Eating Plate as a guide for creating healthy, balanced meals—whether served at the table or packed in a lunch box.</p>
      <ul>
        <li>HEALTHY OILS</li>
        <li>WATER</li>
        <li>VEGETABLES</li>
        <li>FRUITS</li>
        <li>HEALTHY PROTEIN</li>
        <li>WHOLE GRAINS</li>
      </ul>
      <h4>Building a Healthy and Balanced Diet</h4>

  <p>Make most of your meal vegetables and fruits – ½ of your plate. Aim for color and variety, and remember that potatoes don’t count as vegetables on the Healthy Eating Plate because of their negative impact on blood sugar.</p>

  <h4>Go for whole grains – ¼ of your plate.</h4>
  <p>Whole and intact grains—whole wheat, barley, wheat berries, quinoa, oats, brown rice, and foods made with them, such as whole wheat pasta—have a milder effect on blood sugar and insulin than white bread, white rice, and other refined grains.</p>

  <h4>Protein power – ¼ of your plate.</h4>
  <p>Fish, poultry, beans, and nuts are all healthy, versatile protein sources—they can be mixed into salads, and pair well with vegetables on a plate. Limit red meat, and avoid processed meats such as bacon and sausage.</p>

  <h4>Healthy plant oils – in moderation.</h4>
  <p>Choose healthy vegetable oils like olive, canola, soy, corn, sunflower, peanut, and others, and avoid partially hydrogenated oils, which contain unhealthy trans fats. Remember that low-fat does not mean “healthy.”</p>

  <h4>Drink water, coffee, or tea.</h4>
  <p>Skip sugary drinks, limit milk and dairy products to one to two servings per day, and limit juice to a small glass per day.</p>

  <h4>Stay active.</h4>
  <p>The red figure running across the Healthy Eating Plate’s placemat is a reminder that staying active is also important in weight control.</p>
  <h3>The main message of the Healthy Eating Plate is to focus on diet quality:</h3>
  <p>The type of carbohydrate in the diet is more important than the amount of carbohydrate in the diet,  <br></br>
    because some sources of carbohydrate—like vegetables (other than potatoes), fruits, whole grains, <br></br>
     and beans—are healthier than others. The Healthy Eating Plate also advises consumers to avoid sugary beverages, <br></br>
      a major source of calories—usually with little nutritional value—in the American diet. The Healthy Eating Plate <br></br> 
      encourages consumers to use healthy oils, and it does not set a maximum on the percentage of calories people <br></br> 
      should get each day from healthy sources of fat. In this way, the Healthy Eating Plate recommends the opposite <br></br>
       of the low-fat message promoted for decades by the USDA.
  </p>
  </>
  );
}

export default Diet;