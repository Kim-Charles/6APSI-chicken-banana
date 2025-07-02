import { useState } from "react";
import "../styles/chicken_banana.css";

function ChickenBananaGame() {
  const bananaUrl =
    "https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768";
  const chickenUrl =
    "https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg";

  const [board, setBoard] = useState(getRandomBoard);
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [playerChoice, setPlayerChoice] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  // const [images] = useState(
  // Array(36)
  // .fill(null)
  // .map(() => imageUrls[Math.floor(Math.random() * imageUrls.length)])
  // );

  // const [revealed, setRevealed] = useState(Array(36).fill(false));

  // const handleClick = (index) => {
  // setRevealed((prev) => {
  // const newRevealed = [...prev];
  // newRevealed[index] = true;
  // return newRevealed;
  // });
  // };

  function getRandomBoard() {
    const board = [];
    for (let i = 0; i < 36; i++) {
      board.push(Math.random() < 0.5 ? "banana" : "chicken");
    }
    return board;
  }

  const handleTileClick = (index) => {
    if (gameOver || revealed[index] || !playerChoice) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    const clickedItem = board[index];

    if (clickedItem !== playerChoice) {
      setMessage(`Oops! You clicked a ${clickedItem}. You lose!`);
      setGameOver(true);
    } else if (
      newRevealed.every((rev, idx) => !rev || board[idx] !== playerChoice)
    ) {
      setMessage(
        `Congratulations! You found all the ${playerChoice}s. You win!`
      );
      setGameOver(true);
    }
  };

  const startNewGame = () => {
    setBoard(getRandomBoard());
    setRevealed(Array(36).fill(false));
    setGameOver(false);
    setMessage("");
    setPlayerChoice(null);
  };

  return (
    <div className="container">
      <h1>🐔 Chicken Banana Game! 🍌</h1>

      {!playerChoice && (
        <div className="choice">
          <p>Select your side:</p>
          <button
            className="button-player"
            onClick={() => setPlayerChoice("chicken")}
          >
            🐔 Chicken Player
          </button>
          <button
            className="button-player"
            onClick={() => setPlayerChoice("banana")}
          >
            Banana Player 🍌
          </button>
        </div>
      )}

      {playerChoice && (
        <p>
          You are the <strong>{playerChoice.toUpperCase()} Player</strong>.
        </p>
      )}

      {message && <h2>{message}</h2>}

      <button className="restart-button" onClick={startNewGame}>
        Restart Game
      </button>

      <div className="grid">
        {board.map((item, index) => (
          <div
            key={index}
            className="square"
            onClick={() => handleTileClick(index)}
          >
            {revealed[index] ? (
              <img
                src={item === "banana" ? bananaUrl : chickenUrl}
                alt={item}
              />
            ) : (
              <div className="hidden-tile">{index + 1}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChickenBananaGame;
