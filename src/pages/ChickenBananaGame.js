import { useRef, useState, useEffect } from "react";
import "../styles/chicken_banana.css";
import { io } from "socket.io-client";

const socket = io("http://172.18.0.222:3001");

function ChickenBananaGame(props) {
  const [start, setStart] = useState(false);
  const [showSidePopup, setShowSidePopup] = useState(false);
  const [board, setBoard] = useState([]);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [revealed, setRevealed] = useState([]);
  const [playerWon, setPlayerWon] = useState(false);
  const [playerLost, setPlayerLost] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    socket.on("gameState", (state) => {
      setBoard(state.board);
      setRevealed(state.revealed);

      if (playerChoice) {
        const totalToReveal = state.board.filter((item) => item === playerChoice)
          .length;
        const revealedCount = state.revealed.filter(
          (rev, i) => rev && state.board[i] === playerChoice
        ).length;
        const revealedWrong = state.revealed.some(
          (rev, i) => rev && state.board[i] !== playerChoice
        );

        if (revealedWrong) {
          setGameOver(true);
          setPlayerLost(true);
          setPlayerWon(false);
          setMessage("You clicked a wrong tile. Try again!");
        } else if (revealedCount === totalToReveal) {
          setGameOver(true);
          setPlayerWon(true);
          setPlayerLost(false);
          setMessage(`Congratulations! You found all the ${playerChoice}s.`);
        } else {
          setGameOver(false);
          setPlayerWon(false);
          setPlayerLost(false);
          setMessage("");
        }
      } else {
        setMessage("");
      }
    });

    return () => {
      socket.off("gameState");
    };
  }, [playerChoice]);

  // When the game starts
  const handleStart = () => {
    setStart(true);
    setShowSidePopup(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
  };

  const handleTileClick = (index) => {
    if (gameOver || revealed[index]) return;
    socket.emit("revealTile", index);
  };

  const startNewGame = () => {
    socket.emit("resetGame");
    setPlayerChoice(null);
    setShowSidePopup(true);
    setGameOver(false);
    setPlayerWon(false);
    setPlayerLost(false);
    setMessage("");
  };

  return (
    <div className="container">
      <audio ref={audioRef} src={props.backgroundMusic} loop />
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
          )}
          {!showSidePopup && playerChoice && (
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
                  {!revealed[index] && (
                    <span className="tile-index">{index}</span>
                  )}
                </div>
              ))}
            </div>
          )}
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
