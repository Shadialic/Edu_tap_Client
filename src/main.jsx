import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, persistor } from "./Redux/store.jsx";

const clientId = import.meta.env.VITE_CLIENT_ID;
const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
