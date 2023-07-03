import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";

import DetailsPage from "./DetailsPage/DetailsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
