import { useState } from "react";
import "../styles/chicken_banana.css";

const bananaUrl =
  "https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768";
const chickenUrl =
  "https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg";
const crateUrl =
  "https://cdn.creazilla.com/cliparts/1999261/brown-crate-clipart-lg.png";

function ChickenBananaGame() {
  const [start, setStart] = useState(false);
  const [board, setBoard] = useState(getRandomBoard);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [warningShown, setWarningShown] = useState(false);
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [playerWon, setPlayerWon] = useState(false);
  const [playerLost, setPlayerLost] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  function getRandomBoard() {
    const board = [];
    for (let i = 0; i < 36; i++) {
      // Get a 50% chance to change the board
      board.push(Math.random() < 0.5 ? "banana" : "chicken");
    }
    return board;
  }

  const handleTileClick = (index) => {
    if (gameOver || revealed[index]) return;

    // Show warning if no side selected
    if (!playerChoice) {
      setWarningShown(true);
      return;
    }

    // Hide warning if side selected
    setWarningShown(false);

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    const clickedItem = board[index];

    if (clickedItem !== playerChoice) {
      setMessage(`You clicked a ${clickedItem}. You lose!`);
      setGameOver(true);
      setPlayerLost(true);
    } else if (
      newRevealed.every(
        (revealedItem, index) => !revealedItem || board[index] !== playerChoice
      )
    ) {
      setMessage(
        `Congratulations! You found all the ${playerChoice}s. You win!`
      );
      setGameOver(true);
      setPlayerWon(true);
    }
  };

  const startNewGame = () => {
    setBoard(getRandomBoard());
    setRevealed(Array(36).fill(false));
    setGameOver(false);
    setMessage("");
    setPlayerChoice(null);
    setPlayerWon(false);
    setPlayerLost(false);
  };

  return (
    <div className="container">
      {!start ? (
        <>
          <div className="landing-container">
            <div className="landing-h1">🐔 Chicken Banana Game! 🍌</div>
            <h2 className="landing-h2">
              Welcome to Chicken Banana - a 6x6 MineSweeper-based Game!
            </h2>
            <button className="start-button" onClick={() => setStart(true)}>
              START
            </button>
            <h3>By: Kim Charles De Guzman</h3>
          </div>
        </>
      ) : (
        <>
          <h1>🐔 Chicken Banana Game! 🍌</h1>
          {!playerChoice ? (
            <>
              <div className="choice-container">
                <h4>Select your side:</h4>
                <button
                  className="player-button"
                  onClick={() => {
                    setPlayerChoice("chicken");
                    setWarningShown(false);
                  }}
                >
                  🐔 Chicken Player
                </button>
                <button
                  className="player-button"
                  onClick={() => {
                    setPlayerChoice("banana");
                    setWarningShown(false);
                  }}
                >
                  Banana Player 🍌
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="choosen-container">
                <h4>You are:</h4>
                <h2>
                  {playerChoice === "chicken"
                    ? "🐔 Chicken 🐔"
                    : "🍌 Banana 🍌"}
                </h2>
              </div>
            </>
          )}

          <div className="grid">
            {board.map((item, index) => (
              <div
                key={index}
                className="square"
                onClick={() => handleTileClick(index)}
              >
                <img
                  src={
                    revealed[index]
                      ? item === "banana"
                        ? bananaUrl
                        : chickenUrl
                      : crateUrl
                  }
                  alt={item}
                  className="tile-image"
                />
              </div>
            ))}
          </div>

          {playerWon && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h1>🎉 You Win! 🎉</h1>
                {message && <h4>{message}</h4>}
                <button className="restart-button" onClick={startNewGame}>
                  🔄 Play Again
                </button>
              </div>
            </div>
          )}

          {playerLost && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h1>You Lost!</h1>
                {message && <h4>{message}</h4>}
                <button className="restart-button" onClick={startNewGame}>
                  RESTART
                </button>
              </div>
            </div>
          )}

          {warningShown && (
            <div className="warning-box">
              ⚠️ Please select a side before playing!
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ChickenBananaGame;
