import React, { Component } from "react";
import axios from "axios";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: {}, isLoading: false };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get("http://localhost:3001/cart").then(res => {
      const { data } = res;
      this.setState({ cart: { ...data }, isLoading: false });
    });
  }
  clearCart() {
    axios.get("http://localhost:3001/clear").then(res => {
      const { data } = res;
      this.setState({ cart: { ...data } });
    });
  }

  checkout() {
    // checkout handler here
  }

  render() {
    const { cart, isLoading } = this.state;
    if (Object.keys(cart).length === 0 && cart.constructor === Object) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h1>Cart</h1>
        <p>
          <strong>Customer:</strong> {cart.customer}
        </p>
        {cart.rules.length > 0 && (
          <p>
            <strong>Discounts:</strong> {cart.rules}
          </p>
        )}
        <section>
          <ul>
            <li>
              <strong>Products:</strong>
              <ul>
                {cart.products.map((product, i) => {
                  return <li key={i}>{`${product.title} ${product.price}`}</li>;
                })}
              </ul>
            </li>

            <li>
              <strong>Cart Total: </strong>
              {cart.total}
            </li>
          </ul>
        </section>
        <input
          className="btn"
          type="button"
          value="Clear"
          onClick={() => this.clearCart(this)}
        />
        <input
          className="btn"
          type="button"
          value="Checkout"
          onClick={this.checkout}
        />
      </div>
    );
  }
}

export default Cart;
