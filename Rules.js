const pizzas = require("./pizzas");
let pricingRules = [];

const generateRule = (data) => {
  try {
    const { customer, type, itemId, value } = data;

    // validate input
    const validItem = pizzas.find((pizza) => pizza.id === itemId);
    if (!validItem) throw new Error(`Invalid input: id = ${itemId}!`);

    if (["GET", "DISCOUNT"].indexOf(type) === -1)
      throw new Error(`Invalid input: type must be GET or DISCOUNT`);

    switch (type) {
      case "GET":
        const [buy, count] = value;
        if (typeof buy !== "number" || typeof count !== "number")
          throw new Error("input error: buy and count must be number");
        if (Number(buy) < Number(count))
          throw new Error("input error: buy must greater than count");
        break;

      case "DISCOUNT":
        if (typeof value === "string" || value < 0)
          throw new Error(`input error: sale price ${value}`);
        break;
      default:
        break;
    }

    const customerIdx = pricingRules
      .map((item) => item.customer)
      .indexOf(customer);

    if (customerIdx !== -1) {
      const foundCustomer = pricingRules[customerIdx];
      const { rules } = foundCustomer;

      const ruleIdx = rules.map((rule) => rule.itemId).indexOf(itemId);

      if (ruleIdx !== -1) {
        throw new Error("Pricing rule for this pizza existed.");
      } else {
        rules.push({
          itemId,
          type,
          value,
        });
      }
    } else {
      pricingRules.push({
        customer,
        rules: [
          {
            itemId,
            type,
            value,
          },
        ],
      });
    }
  } catch (error) {
    console.log("GEN RULES", error.message);
  }
};

module.exports = {
  pricingRules,
  generateRule,
};
