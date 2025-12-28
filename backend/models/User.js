const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: String,
    provider: { type: String, default: "local" },
    googleId: String,
    role: { type: String, default: "user" },
    resetToken: String,
    resetTokenExp: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
