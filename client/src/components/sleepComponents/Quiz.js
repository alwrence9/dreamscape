import React, {useEffect, useState} from 'react';

function Quiz() {
  const [chronotypeData, setChronotypeData] = useState(null);
  const [insomniaData, setInsomniaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chronotypeAnswers, setChronotypeAnswers] = useState({});
  const [result, setResult] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const chronotypeResponse = await fetch('/api/v1/quiz/chronotype');
        const chronotypeJson = await chronotypeResponse.json();

        const insomniaResponse = await fetch('/api/v1/quiz/insomnia');
        const insomniaJson = await insomniaResponse.json();

        setChronotypeData(chronotypeJson);
        setInsomniaData(insomniaJson);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnswerChange = (questionId, answerType) => {
    setChronotypeAnswers(prevAnswers => ({...prevAnswers, [questionId]: answerType}));
  };

  const handleSubmit = () => {
    const answerTypes = Object.values(chronotypeAnswers);
    const answerCount = answerTypes.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    const mostChosenType = Object.keys(answerCount).reduce((a, b) => answerCount[a] > answerCount[b] ? a : b);
    setResult(mostChosenType);
  };

  if (loading) {
    return <h2>loading</h2>
  }

  if (result) {
    return <h1>You are a {result}</h1>
  }

    return (
    <>
      <h1> Quiz </h1>
      <h2>Loading</h2> : <div>
        {chronotypeData.questions.map(question => (
            <div key={question._id}>
              <p>{question.question}</p>
              {Object.entries(question.choices).map(([type, text]) => (
                  <label key={type}>
                    <input
                        type="radio"
                        name={question._id}
                        value={type}
                        onChange={() => handleAnswerChange(question._id, type)}
                    />
                    {text}
                  </label>
              ))}
            </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default Quiz;