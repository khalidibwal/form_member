import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Homepage from "../component/Home/HomePage";
import Summary from "../report/Summary";

const NavigatorPage = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default NavigatorPage;