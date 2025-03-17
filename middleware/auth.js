const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const decoded = jwt.verify(token, "toiyeuem");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized.",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const decoded = jwt.verify(token, "toiyeuem");
    req.user = decoded;
    if (req.user.roleName !== "admin") {
      return res.status(403).json({
        message: "This action requires admin role.",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized.",
    });
  }
};

module.exports = { verifyToken, isAdmin };
