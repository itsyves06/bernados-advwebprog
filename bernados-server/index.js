const { HttpStatus } = require("./component/config/constants");
require("dotenv").config();

const express = require("express");

const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./component/config/db");
const userRoutes = require("./component/routes/userRoutes");
const productRoutes = require("./component/routes/productRoutes");
const categoryRoutes = require("./component/routes/categoryRoutes");
const cartRoutes = require("./component/routes/cartRoutes");
const reviewRoutes = require("./component/routes/reviewRoutes");
const orderRoutes = require("./component/routes/orderRoutes");

const { auditLoggerMiddleware } = require("./component/middleware/auditLoggerMiddleware");

const app = express();

connectDB();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:      ["'self'"],
      scriptSrc:       ["'self'"],
      styleSrc:        ["'self'", "'unsafe-inline'"],
      imgSrc:          ["'self'", "data:", "blob:"],
      connectSrc:      ["'self'"],
      fontSrc:         ["'self'", "data:"],
      objectSrc:       ["'none'"],
      frameAncestors:  ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  frameguard:    { action: "sameorigin" },         // X-Frame-Options: SAMEORIGIN
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }, // Referrer-Policy
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Accept", "Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); 

app.use(auditLoggerMiddleware);

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.use("/api/v1/users", userRoutes);
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