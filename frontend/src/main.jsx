import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FirebaseProvider } from "./Context/FirebaseContext.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ChatContextProvider } from "./Context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseProvider>
        <ChatContextProvider>
        <App />
        </ChatContextProvider>
      </FirebaseProvider>
    </Provider>
  </React.StrictMode>
);
