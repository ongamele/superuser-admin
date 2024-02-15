
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";

const client = new ApolloClient({
  uri: 'https://mohokare-api-03a5c49b096f.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
