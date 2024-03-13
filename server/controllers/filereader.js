const fs = require('fs/promises');

async function readQuestionsFromFile(filePath) {
  try {
    // Read the JSON file
    const data = await fs.readFile(filePath, 'utf8');
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    // Extract the "questions" array
    const questionsArray = jsonData.questions;
    // Return the extracted array
    return questionsArray;
  } catch (err) {
    console.error('Error reading file:', err);
    throw err; 
  }
}
module.exports = {readQuestionsFromFile};

