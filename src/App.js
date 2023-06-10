import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { AppRoutes } from "./Routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
