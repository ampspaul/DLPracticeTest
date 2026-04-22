import React from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import { APP_TITLE } from "./constants/appConstants";

function App() {
  // Keep browser tab title in sync
  React.useEffect(() => {
    document.title = APP_TITLE;
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Quiz />
      </main>
    </div>
  );
}

export default App;