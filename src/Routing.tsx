import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SingleCountry from "./components/SingleCountry";

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singlecountry/:countryname" element={<SingleCountry />} />
      </Routes>
    </div>
  );
}

export default Routing;
