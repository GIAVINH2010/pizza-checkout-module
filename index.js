const Checkout = require("./Checkout");
const Rules = require("./Rules");

const { pricingRules } = Rules;

const ruleData1 = {
  customer: "Infosys",
  itemId: 1,
  type: "GET",
  value: [3, 2],
};

const ruleData2 = {
  customer: "Amazon",
  itemId: 3,
  type: "DISCOUNT",
  value: 299.99,
};

const ruleData3 = {
  customer: "Facebook",
  itemId: 2,
  type: "GET",
  value: [5, 4],
};
const ruleData4 = {
  customer: "Facebook",
  itemId: 3,
  type: "DISCOUNT",
  value: 389.99,
};
Rules.generateRule(ruleData1);
Rules.generateRule(ruleData2);
Rules.generateRule(ruleData3);
Rules.generateRule(ruleData4);

/**
 * Test case 1
 */
const checkout1 = new Checkout(pricingRules);

checkout1.add({
  id: 1,
  quantity: 1,
});
checkout1.add({
  id: 2,
  quantity: 1,
});
checkout1.add({
  id: 3,
  quantity: 1,
});

console.log("Checkout1", {
  customer: checkout1.customer,
  items: checkout1.items,
});

checkout1.total();

/**
 * Test case 2
 */
const checkout2 = new Checkout(pricingRules);
checkout2.setCustomer = "Infosys";

checkout2.add({
  id: 1,
  quantity: 3,
});
checkout2.add({
  id: 3,
  quantity: 1,
});

console.log("Checkout2", {
  customer: checkout2.customer,
  items: checkout2.items,
});

checkout2.total();

/**
 * Test case 3
 */
const checkout3 = new Checkout(pricingRules);
checkout3.setCustomer = "Amazon";

checkout3.add({
  id: 2,
  quantity: 3,
});
checkout3.add({
  id: 3,
  quantity: 1,
});

console.log("Checkout3", {
  customer: checkout3.customer,
  items: checkout3.items,
});

checkout3.total();
