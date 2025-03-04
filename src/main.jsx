import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app inside the root
root.render(

    <ErrorBoundary>
      <App />
    </ErrorBoundary>
 
);
