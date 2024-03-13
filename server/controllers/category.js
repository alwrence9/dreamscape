// Function to handle submit button click event
function handleSubmit() {
  // Get user choices from the DOM, assuming each choice is represented by radio buttons with class 'choice'
  const choices = document.querySelectorAll('.choice:checked');

  // Extract the selected choice value (e.g., 'A', 'B', 'C', 'D') for each question
  const userChoices = [];
  choices.forEach(choice => {
    const question = choice.dataset.question;
    const selectedChoice = choice.value;
    userChoices.push({ question, choice: selectedChoice });
  });

  // Call function to analyze user choices and determine the most selected chronotype
  const mostSelectedChronotype = determineMostSelectedChronotype(userChoices);

  // Display the most selected chronotype to the user
  alert(`Your most likely chronotype is: ${mostSelectedChronotype}`);
}

// Function to determine the most selected chronotype based on user choices
function determineMostSelectedChronotype(userChoices) {
  // Object to store the frequency of each chronotype choice
  const chronotypeFrequency = {
    Lion: 0,
    Wolf: 0,
    Bear: 0,
    Dolphin: 0
  };

  // Loop through user choices and update chronotype frequency
  userChoices.forEach(choice => {
    const selectedChoice = choice.choice;
    // Increment the corresponding chronotype's frequency
    chronotypeFrequency[selectedChoice]++;
  });

  // Determine the chronotype with the highest frequency
  let mostSelectedChronotype = '';
  let maxFrequency = 0;
  Object.entries(chronotypeFrequency).forEach(([chronotype, frequency]) => {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mostSelectedChronotype = chronotype;
    }
  });

  return mostSelectedChronotype;
}
