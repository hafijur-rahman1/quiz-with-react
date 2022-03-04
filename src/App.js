import "./App.css";
import { useState } from "react";
import QuizCard from "./QuizCard";
import shuffle from "./utility";
import GameOver from "./GameOver";
import "./style.css";

function App() {
  const [quizzes, setQuizzes] = useState(null);
  const [startGame, setStartGame] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [gameScore, setGameScore] = useState(0);

  // ************************
  const startQuiz = async () => {
    const api = await fetch(
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
    );
    const { results } = await api.json();
    setQuizzes(results);
    console.log(results);
    setStartGame(true);

    setSelectedQuestion({
      question: results[0].question,
      answers: shuffle(results[0]), //shuffle import--that function shuffle 'results array'
    });
    setCorrectAnswer(results[0].correct_answer);
    setLoading(true);
  };

  //
  //
  // console.log(correctAnswer, selectedAnswer);
  const nevigateNextQuiz = () => {
    //track last(10th) question
    const isLastQuestion = quizzes.length - 1 === selectedQuestionIndex;

    if (isLastQuestion) {
      setEndGame(true);
    } else {
      const currentIndex = selectedQuestionIndex + 1;
      setSelectedQuestionIndex(currentIndex);
      setSelectedQuestion({
        question: quizzes[currentIndex].question,
        answers: shuffle(quizzes[currentIndex]),
      });
      setCorrectAnswer(quizzes[currentIndex].correct_answer);
      setSelectedAnswer(null);
    }
  };
  //
  //

  // *************
  // user select a answer from multiple answer
  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
    console.log(selectedAnswer, correctAnswer);
    if (answer === correctAnswer) {
      //score ++
      setGameScore((previous) => previous + 1);
    }
    console.log(gameScore);
  };

  const resetQuiz = () => {
    console.log("reset quiz");
    setQuizzes(null);
    setStartGame(false);
    setSelectedQuestion(null);
    setLoading(false);
    setSelectedQuestionIndex(0);
    setEndGame(false);
    setGameScore(0);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
  };

  return (
    <div className="container">
      {!startGame && <button onClick={startQuiz}>Start Quiz</button>}

      {/* / import <Quizcard />  component  pass data on logic 'startgame' and 'loading'-- UseState */}
      {startGame && loading && !endGame && (
        <QuizCard
          selectedQuestion={selectedQuestion}
          nevigateNextQuiz={nevigateNextQuiz}
          selectAnswer={selectAnswer}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          quizzes={quizzes}
          selectedQuestionIndex={selectedQuestionIndex}
        ></QuizCard>
      )}
      {endGame && (
        <GameOver resetQuiz={resetQuiz} gameScore={gameScore}></GameOver>
      )}
    </div>
  );
}

export default App;
