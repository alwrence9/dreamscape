import React, {useEffect, useState} from 'react';

function Quiz() {
    const [chronotypeData, setChronotypeData] = useState(null);
    const [insomniaData, setInsomniaData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chronotypeAnswers, setChronotypeAnswers] = useState({});
    const [insomniaAnswers, setInsomniaAnswers] = useState({});
    const [submitErrorMessage, setSubmitErrorMessage] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const chronotypeResponse = await fetch('/api/v1/quiz/chronotype/5');
            const chronotypeJson = await chronotypeResponse.json();

            const insomniaResponse = await fetch('/api/v1/quiz/insomnia/5');
            const insomniaJson = await insomniaResponse.json();

            setChronotypeData(chronotypeJson);
            setInsomniaData(insomniaJson);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
            setError("There was an error loading the webpage. Try again later.");
        }
    };

    const handleAnswerChange = (quizType, questionId, answerType) => {
        if (quizType === 'chronotype') {
            setChronotypeAnswers(prevAnswers => ({...prevAnswers, [questionId]: answerType}));
        } else if (quizType === 'insomnia') {
            setInsomniaAnswers(prevAnswers => ({...prevAnswers, [questionId]: answerType}));
        }
    };

    const handleSubmit = () => {
        if (Object.keys(chronotypeAnswers).length < chronotypeData.questions.length || Object.keys(insomniaAnswers).length < insomniaData.questions.length) {
            setSubmitErrorMessage("Answers all questions before submitting");
            return;
        }

        const calculateMostChosenType = (answers) => {
            const answerTypes = Object.values(answers);
            const answerCount = answerTypes.reduce((acc, type) => {
                acc[type] = (acc[type] || 0) + 1;
                return acc;
            }, {});
            return Object.keys(answerCount).reduce((a, b) => answerCount[a] > answerCount[b] ? a : b);
        };

        const mostChosenChronotype = calculateMostChosenType(chronotypeAnswers);
        const mostChosenInsomniaType = calculateMostChosenType(insomniaAnswers);
        setResult({ chronotype: mostChosenChronotype, insomnia: mostChosenInsomniaType });
    };

    const handleRetake = () => {
        setChronotypeAnswers({});
        setInsomniaAnswers({});
        setResult(null);
        setSubmitErrorMessage(null);
        fetchData();
    };

    if (loading) {
        return <h2>loading</h2>
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    if (result) {
        return (
            <>
                <h1>You are a {result.chronotype}</h1>
                <h1>You have {result.insomnia} insomnia</h1>
                <button onClick={handleRetake}>Retake Quiz</button>
            </>
        )
    }

    return (
        <>
            <h1>Quiz</h1>
            <h2>Chronotype Quiz</h2>
            {chronotypeData.questions.map(question => (
                <div key={question._id}>
                    <p>{question.question}</p>
                    {Object.entries(question.choices).map(([type, text]) => (
                        <label key={type}>
                            <input
                                type="radio"
                                name={question._id}
                                value={type}
                                onChange={() => handleAnswerChange('chronotype', question._id, type)}
                            />
                            {text}
                        </label>
                    ))}
                </div>
            ))}
            <h2>Insomnia Quiz</h2>
            {insomniaData.questions.map(question => (
                <div key={question._id}>
                    <p>{question.question}</p>
                    {Object.entries(question.choices).map(([type, text]) => (
                        <label key={type}>
                            <input
                                type="radio"
                                name={question._id}
                                value={type}
                                onChange={() => handleAnswerChange('insomnia', question._id, type)}
                            />
                            {text}
                        </label>
                    ))}
                </div>
            ))}
            {submitErrorMessage && <p style={{color: 'red'}}>{submitErrorMessage}</p>}
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
}

export default Quiz;