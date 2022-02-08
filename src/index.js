import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PlaylistDetail } from "./components/PlaylistDetail";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import spotify from "./features/spotify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const store = configureStore({
  reducer: {
    spotify,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/playlist/:id" element={<PlaylistDetail />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
