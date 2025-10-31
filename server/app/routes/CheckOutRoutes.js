const express = require("express");
const Checkoutrouter = express.Router();

Checkoutrouter.post("/promo/validate", (req, res) => {
  const { promoCode } = req.body;
  // Simple promo code validation logic
  const validPromoCodes = {
    SAVE10: {
      value: 10,
      type: "percentage",
    },
    SAVE20: {
      value: 20,
      type: "percentage",
    },
    FLAT100: {
      value: 100,
      type: "fixed",
    },
  };
  if (validPromoCodes.hasOwnProperty(promoCode)) {
    res.status(200).json({
      valid: true,
      discount: validPromoCodes[promoCode],
    });
  } else {
    res.status(200).json({
      valid: false,
      discount: 0,
      msg: "Invalid promo code",
    });
  }
});

module.exports = Checkoutrouter;
