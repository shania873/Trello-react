const jwt = require("jsonwebtoken");

let User = require("../models/user");

exports.setLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, password } });
    const secretKey = process.env.SECRET_KEY;

    if (user) {
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
        algorithm: "HS256",
      });

      res.cookie("refresh_token", token, {
        sameSite: "none",
        httpOnly: false,
        domain: null,
        path: "/",
        secure: true,
        maxAge: 3600000,
      });

      res.status(200).json({ message: "Connecté avec succès", token });
    } else {
      res
        .status(401)
        .json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

exports.logout = (req, res) => {
  try {
    const revokedTokens = new Set();

    const token = req.headers.cookie && req.headers.cookie.split("=")[1];
    const decoded = jwt.decode(token);

    revokedTokens.add(decoded.jti);

    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    res.status(500).json({ error: "Erreur lors de la déconnexion" });
  }
};
