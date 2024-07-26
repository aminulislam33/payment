const express = require('express');
const router = express.Router();
const razorpay = require('../razorpay');

router.get("/", (req,res)=>{
    return res.sendFile(path.join(__dirname, 'index.html'));
  });

router.post('/create-order', async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;