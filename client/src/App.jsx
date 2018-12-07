import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Plans from "./Plans";
import Header from "./Header";
import Cart from "./Cart";

const App = () => (
  <Router>
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <Header />

      <Route exact path="/" component={Plans} />
      <Route path="/plans" component={Plans} />
      <Route path="/cart" component={Cart} />
    </div>
  </Router>
);

export default App;
