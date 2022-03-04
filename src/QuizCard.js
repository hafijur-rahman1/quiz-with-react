import React from "react";
import AnswerCard from "./AnswerCard";

const QuizCard = ({
  selectedQuestion,
  nevigateNextQuiz,
  selectAnswer,
  selectedAnswer,
  correctAnswer,
  quizzes,
  selectedQuestionIndex,
}) => {
  //   console.log(selectedQuestion);
  const { question, answers } = selectedQuestion;

  const navigateNext = () => {
    nevigateNextQuiz();
  };

  return (
    <div className="question-card">
      <p>
        Question NO-- {selectedQuestionIndex + 1} / {quizzes.length}
      </p>
      <h3>{question}</h3>

      {answers.map((answer, i) => (
        <AnswerCard
          answer={answer}
          key={i}
          selectAnswer={selectAnswer}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
        ></AnswerCard>
      ))}

      <button onClick={navigateNext}>Next Question</button>
    </div>
  );
};

export default QuizCard;
