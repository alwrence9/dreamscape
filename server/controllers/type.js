const readQuestionsFromFile = require('./filereader');
async function classifyQuestions(filePath) {
  try {
    // Read the entire JSON object
    const questionsObject = await readQuestionsFromFile(filePath);

    // Extract individual type arrays
    const chronotypesQuestions = questionsObject['Chronotypes'] || [];
    const insomniaQuestions = questionsObject['Insomnia'] || [];


    return {
      chronotypesQuestions,
      insomniaQuestions,
    };
  } catch (err) {
    console.error('Error classifying questions:', err);
    throw err; // Re-throw the error for handling at a higher level if needed
  }
}
const filepath = '/database/questions.json';
(async () => {
  try {
    const array = await classifyQuestions(filepath);
    console.log(array);
  } catch (err) {
    console.error('Error:', err);
  }
})();
