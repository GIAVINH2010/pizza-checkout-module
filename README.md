# [Pizza] Checkout module

## Contents

- [Description](#description)
- [Requirements](#requirements)
- [Usage](#usage)

## Description

JavaScript checkout module with custom pricing rules for a small number of privileged
customers

## Requirements

Node installed

## Usage

```sh
node index.js
```

Call **generateRule()** to create new pricing rule for customer

```js
const ruleData1 = {
  customer: "Infosys",
  itemId: 1,
  type: "GET",
  value: [3, 2],
};
```

```js
Rules.generateRule(ruleData1);
```

Create new checkout from class **Checkout** with **pricingRules** parameter

Call **add()** with params **{ id: pizzaId, quantity: Number }**

Call **total()** to checkout

```js
const { pricingRules } = Rules;

const checkout = new Checkout(pricingRules);
checkout.setCustomer = "Infosys";

checkout.add({
  id: 1,
  quantity: 3,
});
checkout.add({
  id: 3,
  quantity: 1,
});

checkout.total();
```