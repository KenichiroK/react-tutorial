import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const Square = (props) => {
  return (
    <button 
      className="square" 
      onClick={ () => props.onClick() } 
    >
      { props.value }
    </button>
  )
}



const Board = () => {

  // useState を呼ぶと何が起きるの？
  // → 『state 変数』が宣言され、
  //    Reactのstate機能が関数コンポーネントに追加される
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);
  // console.log(squares.slice())
  const handleClick = (i) => {
    // slice(): 配列のコピーを作成する→ 不変性を保つため
    const createSquares = squares.slice();
    if (calculateWinner(createSquares) || createSquares[i]) {
      return;
    }
    createSquares[i] = xIsNext ? 'X' : 'O';
    // console.log(createSquares[i])
    setSquares(createSquares);
    setXIsNext(!xIsNext);
  }

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  const winner = calculateWinner(squares);
  // console.log(winner)
  let status = 'Next player: ' + (xIsNext ? 'X' : 'O');

  console.log(winner)
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {/* <div className="">{alert}</div> */}
      <div className="board-row">
        { renderSquare(1) }
        { renderSquare(2) }
        { renderSquare(3) }
      </div>
      <div className="board-row">
        { renderSquare(4) }
        { renderSquare(5) }
        { renderSquare(6) }
      </div>
      <div className="board-row">
        { renderSquare(7) }
        { renderSquare(8) }
        { renderSquare(9) }
      </div>
    </>
  );
}

// class Board extends React.Component {
//   renderSquare(i) {
//     return <Square value={i} />;
//   }

//   render() {
//     const status = 'Next player: X';

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
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
}
