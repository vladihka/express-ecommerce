const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: [{ name: String, values: [String] }],
});

module.exports = mongoose.model("Category", CategorySchema);
