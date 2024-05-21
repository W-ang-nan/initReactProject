import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
// import { ThemeProvider } from "@/components/theme";
// import LeftMenu from "@/components/custom/LeftMenu";
import "./index.css";
import App from "./App";
import store from "@/store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
