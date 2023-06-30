import { useContext, useEffect } from "react";
import "./App.css";
import { Loader } from "./Components/Loader/Loader";
import { AppRoutes } from "./Routes/AppRoutes";
import { AuthContext } from "./Contexts/AuthContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { TopBar } from "./Components/Topbar/Topbar";

function App() {
  const {
    loader,
    authState: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      document.body.classList.add("token-present");
    } else {
      document.body.classList.remove("token-present");
    }
  }, [token]);

  return (
    <div className="App">
      <div className="topbar-container">{token && <TopBar />}</div>

      {loader ? <Loader /> : <AppRoutes />}

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
