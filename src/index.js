import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server.js";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext, AuthProvider } from "./Contexts/AuthContext";
import { DataContext, DataProvider } from "./Contexts/DataContext";
export { AuthContext, DataContext };

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
