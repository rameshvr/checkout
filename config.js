const config = {
  customer: "Apple",
  promotions: [
    {
      customerName: "default",
      promotion: []
    },
    {
      customerName: "Unilever",
      promotion: [{ plan: "classic", minimumCount: "3", rule: "BUY2GET3" }]
    },
    {
      customerName: "Apple",
      promotion: [{ plan: "standout", minimumCount: "1", rule: "DISCOUNT-299" }]
    },
    {
      customerName: "Nike",
      promotion: [{ plan: "premium", minimumCount: "4", rule: "DISCOUNT-379" }]
    },
    {
      customerName: "Ford",
      promotion: [
        { plan: "classic", minimumCount: "5", rule: "BUY4GET5" },
        { plan: "standout", minimumCount: "1", rule: "DISCOUNT-309" },
        { plan: "premium", minimumCount: "3", rule: "DISCOUNT-389" }
      ]
    }
  ]
};

module.exports = config;
