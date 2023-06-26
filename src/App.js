import { useContext } from "react";
import "./App.css";
import { Loader } from "./Components/Loader/Loader";
import { AppRoutes } from "./Routes/AppRoutes";
import { AuthContext } from "./Contexts/AuthContext";

function App() {
  const { loader } = useContext(AuthContext);

  return (
    <div className="App">
      {loader && <Loader />}
      <AppRoutes />
    </div>
  );
}

export default App;
