const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// GET категории
router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find().populate("parent");
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении категорий" });
  }
});

// POST категория
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, parent, properties } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const category = await Category.create({
      name,
      parent: parent || undefined,
      properties: properties || [],
    });

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при создании категории" });
  }
});

// DELETE категория
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении категории" });
  }
});

module.exports = router;
