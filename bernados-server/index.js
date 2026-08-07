const { HttpStatus } = require("./component/config/constants");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./component/config/db");
const userRoutes = require("./component/routes/userRoutes");
const productRoutes = require("./component/routes/productRoutes");
const categoryRoutes = require("./component/routes/categoryRoutes");
const cartRoutes = require("./component/routes/cartRoutes");
const reviewRoutes = require("./component/routes/reviewRoutes");
const orderRoutes = require("./component/routes/orderRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.options(" ", cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;