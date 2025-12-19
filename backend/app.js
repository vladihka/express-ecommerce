require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // Разрешаем запросы с фронтенда
app.use(express.json());

// Тест
app.get("/", (req, res) => res.send("Backend работает!"));

// Роуты
app.use("/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/categories"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
