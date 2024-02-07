const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res) => {
  const token = req.headers.cookie && req.headers.cookie.split("=")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY,
    { algorithms: ["HS256"] },
    (err, decodedToken) => {
      if (err) {
        console.error("Autre erreur :", err.message);
      }
      return res.status(200).json({ message: "Token valid", token });
    }
  );
};
