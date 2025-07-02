import { useRef, useState } from "react";
import "../styles/chicken_banana.css";

function ChickenBananaGame(props) {
  const [debugReveal, setDebugReveal] = useState(true); // Debugging
  const [start, setStart] = useState(false);
  const [showSidePopup, setShowSidePopup] = useState(false);
  const [board, setBoard] = useState(getRandomBoard);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [playerWon, setPlayerWon] = useState(false);
  const [playerLost, setPlayerLost] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const audioRef = useRef(null);

  // When the game start, start playing the background music.
  const handleStart = () => {
    setStart(true);
    setShowSidePopup(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
  };

  // Set the board with random but 50/50 distribution board [chicken, banana].
  function getRandomBoard() {
    const board = [];
    for (let i = 0; i < 36; i++) {
      board.push(Math.random() < 0.5 ? "banana" : "chicken");
    }
    return board;
  }

  // Logic for clicking the grid.
  const handleTileClick = (index) => {
    // Check if the game is over or tile is revealed, if true, make sure that nothing is returning - or do nothing when tile is clicked again.
    if (gameOver || revealed[index]) return;

    // After the player clicked the tile, reveal the img [chicken or banana].
    const newRevealed = [...revealed];
    newRevealed[index] = true; // All tiles are set filled as false, make them true to reveal.
    setRevealed(newRevealed);

    // Check if player win or lose, display message.
    const clickedItem = board[index];

    // If player clicked the wrong item, display losing message.
    if (clickedItem !== playerChoice) {
      setMessage(`You clicked a ${clickedItem}. Try again!`);
      setGameOver(true);
      setPlayerLost(true);
    } else {
      // If player clicked the correct item.
      // Check if the player revealed all chosen item [chicken or banana]

      // Count the number of player choice item [chicken or banana] from random board.
      const totalToReveal = board.filter(
        (item) => item === playerChoice
      ).length;

      // Count the number of the revealed item by player choice.
      const revealedCount = newRevealed.filter(
        (revealedItem, i) => revealedItem && board[i] === playerChoice
      ).length;

      // If player revealed all the same item from the random board, display winning message.
      if (revealedCount === totalToReveal) {
        setMessage(`Congratulations! You found all the ${playerChoice}s.`);
        setGameOver(true);
        setPlayerWon(true);
      }
    }
  };

  // If game over, initialized all state on false.
  const startNewGame = () => {
    setStart(false);
    setBoard(getRandomBoard());
    setRevealed(Array(36).fill(false));
    setGameOver(false);
    setMessage("");
    setPlayerChoice(null);
    setPlayerWon(false);
    setPlayerLost(false);
    setShowSidePopup(false);
  };

  return (
    <div className="container">
      <audio ref={audioRef} src={props.backgroundMusic} loop />
      {/* // Landing container */}
      {!start ? (
        <div className="landing-container">
          <div className="landing-h1">🐔 Chicken Banana Game! 🍌</div>
          <h2 className="landing-h2">
            Welcome to Chicken Banana - a 6x6 MineSweeper-based Game!
          </h2>
          <button className="start-button" onClick={handleStart}>
            START
          </button>
          <h3>By: Kim Charles De Guzman</h3>
        </div>
      ) : (
        <>
          {/* After clicking START button, start the game and set up pop up selecting side. */}
          {!showSidePopup && playerChoice && (
            <div className="choosen-container">
              <h1>🐔 Chicken Banana Game! 🍌</h1>
              <h4>You are:</h4>
              <h2>
                {playerChoice === "chicken"
                  ? "🐔 Chicken Player 🐔"
                  : "🍌 Banana Player 🍌"}
              </h2>
            </div>
          )}
          {showSidePopup && (
            <>
              <div className="popup-overlay">
                <div className="popup-content">
                  <h1>🐔 Chicken Banana Game! 🍌</h1>
                  <h4>Select Your Side:</h4>
                  <button
                    className="player-button"
                    onClick={() => {
                      setPlayerChoice("chicken");
                      setShowSidePopup(false);
                    }}
                  >
                    🐔 Chicken Player
                  </button>
                  <button
                    className="player-button"
                    onClick={() => {
                      setPlayerChoice("banana");
                      setShowSidePopup(false);
                    }}
                  >
                    🍌 Banana Player
                  </button>
                </div>
              </div>
            </>
          )}

          {/* After selecting a side, display the grid. */}
          {!showSidePopup && playerChoice && (
            <>
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
                            ? props.bananaUrl
                            : props.chickenUrl
                          : props.crateUrl
                      }
                      alt={item}
                      className="tile-image"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* If player won, display a message */}
          {playerWon && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h1>You Win!</h1>
                <h4>{message}</h4>
                <button className="restart-button" onClick={startNewGame}>
                  PLAY AGAIN
                </button>
              </div>
            </div>
          )}

          {/* If player won, display a message */}
          {playerLost && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h1>You Lose!</h1>
                <h4>{message}</h4>
                <button className="restart-button" onClick={startNewGame}>
                  RESTART
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ChickenBananaGame;
