import React from "react";

const GameOver = ({ resetQuiz, gameScore }) => {
  //   const resetQuiz = () => {};
  return (
    <div>
      <p>Total score {gameScore},GameOver</p>
      <button onClick={resetQuiz}>Reset Quiz</button>
    </div>
  );
};

export default GameOver;
