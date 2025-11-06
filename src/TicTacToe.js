import React, { useState } from "react";

const TicTacToe = () => {
  // Board is an array of 9 cells, initially empty
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true); // X starts first
  const [winner, setWinner] = useState(null);

  // Handle click on a cell
  const handleClick = (index) => {
    if (board[index] !== "" || winner) return; // ignore if cell filled or game over

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    checkWinner(newBoard);
  };

  // Check for winner
  const checkWinner = (b) => {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];

    for (let line of lines) {
      const [a, b1, c] = line;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        setWinner(b[a]);
        return;
      }
    }

    if (!b.includes("")) {
      setWinner("Draw");
    }
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Tic Tac Toe</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "5px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              border: "1px solid black",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <h2>{winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}</h2>
      )}
      <button onClick={resetGame} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
