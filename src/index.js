import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const Square = (props) => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

const Board = (props) => {
  const renderSquare = (i) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
};

const Game = () => {
  const [history, setHistory] = React.useState([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXIsNext] = React.useState(true);

  const handleClick = (i) => {
    const createdHistory = history;
    const current = createdHistory[createdHistory.length - 1];

    const createSquares = current.squares.slice();
    if (calculateWinner(createSquares) || createSquares[i] === "X" || createSquares[i] === "O") {
      return;
    }
    createSquares[i] = xIsNext ? "X" : "O";
    setHistory(
      createdHistory.concat([{squares: createSquares}]),
    );
    setStepNumber(history.length);
    setXIsNext(!(xIsNext));
  };

  const jumpTo = (step) => {
    setStepNumber(
      (step),
    )
    setXIsNext(
      { xIsNext: (step % 2) === 0},
    );
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })
  let status;
  if(winner) {
    status =`Winner: ${winner}`;
  }else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares = {current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{ moves }</ol>
      </div>
    </div>
  );
};

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
