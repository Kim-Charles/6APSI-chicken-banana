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
      crateUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XNJWta68539AYZ9XnVY_rM0TPC_ps7JTqQ&s"
      backgroundMusic="/audio/chicken_banana.mp3"
    />
  );
}

export default App;
