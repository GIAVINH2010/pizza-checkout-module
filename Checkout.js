const pizzas = require("./pizzas");

class Checkout {
  customer = "default";
  items = [];
  #total = 0;
  #pricingRules;

  constructor(pricingRules) {
    this.#pricingRules = pricingRules;
  }

  // setter
  set setCustomer(customer) {
    this.customer = customer;
  }

  // method
  calculate() {
    try {
      // filter customer rules
      const thisCustomerRules = this.#pricingRules.find(
        (rule) => rule.customer === this.customer
      );
      let privilege;

      if (thisCustomerRules) {
        privilege = thisCustomerRules.rules;
      }

      for (const item of this.items) {
        const { id, quantity } = item;
        const foundPizza = pizzas.find((pizza) => pizza.id === id);
        const { retailPrice } = foundPizza;

        const isAdopted =
          privilege && privilege.find((rule) => rule.itemId === id);

        if (isAdopted) {
          const { type, value } = isAdopted;
          switch (type) {
            case "GET":
              const [buy, count] = value;

              const newQuantity =
                Math.floor(quantity / buy) * count + (quantity % buy);

              this.#total += retailPrice * newQuantity;
              break;

            case "DISCOUNT":
              this.#total += value * quantity;
              break;
            default:
              break;
          }
        } else {
          this.#total += retailPrice * quantity;
        }
      }
    } catch (error) {
      console.log("CALC ERROR", error.message);
    }
  }

  add(item) {
    try {
      const { id, quantity } = item;

      // validate input
      const validItem = pizzas.find((pizza) => pizza.id === id);

      if (!validItem) throw new Error(`Invalid input: id = ${id}!`);

      if (typeof quantity !== "number" || quantity <= 0)
        throw new Error(`Invalid input: quantity = ${quantity}`);

      const found = this.items.map((item) => item.id).indexOf(id);

      if (found === -1) {
        this.items.push(item);
      } else {
        this.items[found].quantity += quantity;
      }
    } catch (error) {
      console.log("ADD ERROR", error.message);
    }
  }

  total() {
    this.calculate();
    console.log("TOTAL: ", `$${Math.round(this.#total * 100) / 100}`);
  }
}

module.exports = Checkout;
