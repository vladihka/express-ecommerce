require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://express-ecommerce-ruddy.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // разрешаем запросы без origin (Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Тест
app.get("/", (req, res) => res.send("Backend работает!"));

// Роуты
app.use("/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/categories"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
