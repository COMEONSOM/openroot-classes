const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // ✅ LOAD ENV
// SERVER ON RENDER

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ✅ SECURE RAZORPAY SETUP
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ CREATE ORDER
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "openroot_" + Date.now(),
    });

    res.json(order);
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).send("Server error");
  }
});

// ✅ VERIFY PAYMENT
app.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) // ✅ FROM .env
      .update(body.toString())
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      res.json({ status: "success" });
    } else {
      res.status(400).json({ status: "failed" });
    }
  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).send("Verification failed");
  }
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});