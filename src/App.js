import React from "react";
import styles from "./App.styles";
import JokesList from "./components/jokes/JokesList";

function App() {
  return (
    <div style={styles.app}>
      <JokesList />
    </div>
  );
}

export default App;
