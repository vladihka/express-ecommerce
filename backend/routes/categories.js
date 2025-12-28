const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const categories = await Category.find().populate("parent");
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении категорий" });
  }
});

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
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

router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await Category.deleteOne({ _id: req.params.id });
        res.json({ message: "ok" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении категории" });
    }
});

module.exports = router;
