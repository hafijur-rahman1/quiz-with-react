import React from "react";

const AnswerCard = ({
  answer,
  selectAnswer,
  selectedAnswer,
  correctAnswer,
}) => {
  const isRightAnswer = selectedAnswer && answer === correctAnswer;
  const isWrongAnswer = selectedAnswer && answer !== correctAnswer;

  const correctClass = isRightAnswer ? "correct-answer" : "";
  const wrongClass = isWrongAnswer ? "incorrect-answer" : "";
  const disableClass = selectedAnswer ? "disabled-answer" : "";
  // console.log(isRightAnswer);
  return (
    <p
      className={`quiz-answer ${correctClass} ${wrongClass} ${disableClass}`}
      onClick={() => selectAnswer(answer)}
    >
      {answer}
    </p>
  );
};

export default AnswerCard;
