import { useContext } from "react";
import "./App.css";
import { Loader } from "./Components/Loader/Loader";
import { AppRoutes } from "./Routes/AppRoutes";
import { AuthContext } from "./Contexts/AuthContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { loader } = useContext(AuthContext);

  return (
    <div className="App">
      {loader && <Loader />}
      <AppRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
