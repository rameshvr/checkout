import React, { Component } from "react";
import axios from "axios";

class Plans extends Component {
  renderPlan(plan) {
    const { title, features } = plan;
    return (
      <section className="card">
        <h2>{title.toUpperCase()}</h2>
        <ul>
          {features.map((feature, index) => {
            return <li key={index}>{feature}</li>;
          })}
        </ul>
        <input
          className="btn"
          type="button"
          value="Buy"
          onClick={() => this.handleBuy(plan)}
        />
      </section>
    );
  }

  handleBuy = plan => {
    axios
      .post("http://localhost:3001/cart", {
        ...plan
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    return false;
  };

  render() {
    const plans = [
      {
        title: "classic",
        features: ["feature 1", "feature 2"],
        price: 269.99,
        discount: 0,
        currency: "USD"
      },
      {
        title: "standout",
        features: ["feature 1", "feature 2"],
        price: 322.99,
        discount: 0,
        currency: "USD"
      },
      {
        title: "premium",
        features: ["feature 1", "feature 2"],
        price: 394.99,
        discount: 0,
        currency: "USD"
      }
    ];

    return (
      <div>
        <h1>Plans</h1>
        <ul className="plan-list">
          {plans.map((plan, index) => {
            return <li key={index}>{this.renderPlan(plan)}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Plans;
