import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "User is Unauthorized (No token)" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ use .id instead of .userId
    next();
  } catch (error) {
    return res.status(401).json({ message: "User is Unauthorized (Invalid token)" });
  }
};
