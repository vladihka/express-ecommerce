module.exports = function isAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Доступ запрещён" });
  }
  next();
};
