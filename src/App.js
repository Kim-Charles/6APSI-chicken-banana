import logo from "./logo.svg";
import "./App.css";
import Welcome from "./pages/Welcome";
import Counter from "./pages/Counter";
import ChickenBananaGame from "./pages/ChickenBananaGame";

function App() {
  return (
    <ChickenBananaGame
      bananaUrl="https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768"
      chickenUrl="https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg"
      crateUrl="https://cdn.creazilla.com/cliparts/1999261/brown-crate-clipart-lg.png"
      backgroundMusic="/audio/chicken_banana.mp3"
    />
  );
}

export default App;
