const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User is not logged in!" });

  try {
    const validToken = verify(accessToken, "Bolognese");
    req.user = validToken
    if (validToken) {
      return next();
    }
  } catch (error) {
    console.log({error: error})
  }
};

module.exports = {validateToken}
