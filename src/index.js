import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";

import { Provider } from "./context";
import App from "./components/App";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
