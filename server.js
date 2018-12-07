const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const config = require("./config");

const app = express();
app.use(
  bp.urlencoded({
    extended: true
  })
);

app.use(bp.json());
app.use(cors());

let cart = {};
const init = () => {
  cart = {
    id: "",
    products: [],
    promotion: [],
    rules: [],
    customer: config.customer,
    total: 0
  };
};
init();

function deleteProduct() {
  // delete individual product handler
}

function addToCart(plan) {
  cart.products.push(plan);
  cart.total = cartTotal(cart);
}

const getPromotion = (customer, promotions) => {
  return promotions.filter(promotion => {
    if (promotion.customerName == customer) return promotion;
  });
};

const cartTotal = cart => {
  const { products, promotions } = cart;
  const total = products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  return total;
};

const getPlanCounts = cart => {
  const { products } = cart;
  let planCounts = {
    classic: 0,
    standout: 0,
    premium: 0
  };
  products.map(product => {
    switch (product.title) {
      case "classic":
        planCounts.classic = planCounts.classic + 1;
        break;
      case "standout":
        planCounts.standout = planCounts.standout + 1;
        break;
      case "premium":
        planCounts.premium = planCounts.premium + 1;
        break;
    }
  });
  return planCounts;
};

const applyPromotion = cart => {
  return new Promise((resolve, reject) => {
    const planCounts = getPlanCounts(cart);
    const { rules } = cart;
    rules.map(rule => {
      switch (rule) {
        case "BUY2GET3":
        case "BUY4GET5":
          cart.total = cart.total - 269.99;
          break;
        case "DISCOUNT-299":
          cart.total = cart.total - planCounts["standout"] * (322.99 - 299.99);
          // TODO: pop this rule from cart object to prevent getting applied again
          break;
        case "DISCOUNT-379":
          cart.total = cart.total - planCounts["premium"] * (394.99 - 379.99);
          break;
        case "DISCOUNT-309":
          cart.total = cart.total - planCounts["standout"] * (322.99 - 309.99);
          break;
        case "DISCOUNT-389":
          cart.total = cart.total - planCounts["premium"] * (394.99 - 389.99);
          break;
      }
    });
    resolve(cart);
  });
};

const handlePromotions = (cart, customer) => {
  const promotions = config.promotions;
  return new Promise((resolve, reject) => {
    const promotion = getPromotion(customer, promotions);
    const planCounts = getPlanCounts(cart);
    if (!cart.promotion.length) {
      cart.promotion.push(promotion);
    }

    promotion[0].promotion.map(promo => {
      const { minimumCount, plan, rule } = promo;
      if (minimumCount && planCounts[plan] >= minimumCount) {
        if (!cart.rules.includes(rule)) {
          cart.rules.push(rule);
        }
      }
    });

    applyPromotion(cart).then(res => {
      resolve(res);
    });
  });
};

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/cart", (req, res) => {
  handlePromotions(cart, cart.customer).then(data => {
    res.json(data);
  });
});

app.post("/cart", (req, res) => {
  addToCart(req.body);
  res.json(cart);
});

app.get("/clear", (req, res) => {
  init();
  res.json(cart);
});

app.listen(app.get("port"));
