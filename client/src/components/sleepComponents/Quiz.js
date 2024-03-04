import React, { useState } from 'react';

function Quiz() {

    return (
    <>
      <h1> Quiz </h1>
      <form>
        <fieldset>
          <legend> What is your chronotype?</legend>
          
          <label>
            1. Are you naturally inclined to wake up early in the morning or stay up late at night?
            <br />
            <input type="radio" name="q1" value="early" /> Early Bird
            <input type="radio" name="q1" value="late" /> Night Owl
          </label>

          <br />
          <br />

          <label>
            2. Do you have a family history of being either an early bird or a night owl?
            <br />
            <input type="radio" name="q2" value="yes" /> Yes
            <input type="radio" name="q2" value="no" /> No
          </label>

          <br />
          <br />

          <label>
            3. When do you feel most alert and energetic during the day - morning, afternoon, or evening?
            <br />
            <input type="radio" name="q3" value="morning" /> Morning
            <input type="radio" name="q3" value="afternoon" /> Afternoon
            <input type="radio" name="q3" value="evening" /> Evening
          </label>

          <br />

          <label>
            4. Do you find it easy to wake up early and be productive in the morning?
            <br/>
            <input type="radio" name="q4" value="yes"/> Yes
            <input type="radio" name="q4" value="no"/> No
          </label>

          <br />
          <br />

          <label>
            5. Do you experience difficulties falling asleep at night or waking up in the morning?
            <br/>
            <input type="radio" name="q5" value="yes"/> Yes
            <input type="radio" name="q5" value="no"/> No
          </label>

          <br />
          <br />

          <label>
            6. Are you more comfortable with socializing in the morning or in the evening?
            <br/>
            <input type="radio" name="q6" value="morning"/> Morning
            <input type="radio" name="q6" value="evening"/> Evening
          </label>

          <br />
          <br />

          <label>
            7. How well do you adapt to traditional office hours, starting early in the morning?
            <br/>
            <input type="radio" name="q7" value="well"/> Well
            <input type="radio" name="q7" value="not-well"/> Not well
          </label>

          <br />
          <br />

          <label>
            8. Do you prefer having meals and exercising in the morning or in the evening?
            <br/>
            <input type="radio" name="q8" value="morning"/> Morning
            <input type="radio" name="q8" value="evening"/> Evening
          </label>

          <br />
          <br />

          <label>
            9. Have you noticed changes in your sleep patterns based on the seasons or geographical location?
            <br/>
            <input type="radio" name="q9" value="yes"/> Yes
            <input type="radio" name="q9" value="no"/> No
          </label>

          <br />
          <br />

          <label>
            10. Would you describe yourself as open to trying new things and experiences?
            <br/>
            <input type="radio" name="q10" value="yes"/> Yes
            <input type="radio" name="q10" value="no"/> No
          </label>

          <br />
          <br />

          <label>
            11. Are you generally organized, goal-oriented, and responsible in your daily life?
            <br/>
            <input type="radio" name="q11" value="yes"/> Yes
            <input type="radio" name="q11" value="no"/> No
          </label>

          <br />
          <br />

          <label>
            12. Would you say you are cooperative, friendly, and considerate towards others?
            <br/>
            <input type="radio" name="q12" value="yes"/> Yes
            <input type="radio" name="q12" value="no"/> No
          </label>

          <br />
          <br />

          <label>
            13. Do you often experience high levels of anxiety or nervousness?
            <br/>
            <input type="radio" name="q13" value="yes"/> Yes
            <input type="radio" name="q13" value="no"/> No
          </label>

          <br />
          <br />

          <label>
            14. Do you find that you are more productive and alert during the late evening?
            <br/>
            <input type="radio" name="q14" value="yes"/> Yes
            <input type="radio" name="q14" value="no"/> No
          </label>

          <br />
          <br />

          <label>
            15. Have you ever experienced difficulty sleeping or maintaining a regular sleep pattern?
            <br/>
            <input type="radio" name="q15" value="yes"/> Yes
            <input type="radio" name="q15" value="no"/> No
          </label>

          <br />
          <br />

        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Quiz;