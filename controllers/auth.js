const { findOne } = require("../models/Administrator");
const Administrator = require("../models/Administrator");

exports.register = async (req, res, next) => {
  const { name, email, password, organizationName } = req.body;
  try {
    const administrator = await Administrator.create({
      name,
      email,
      password,
      organizationName,
    });

    res.status(201).json({
      sucess: true,
      administrator,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error: error.message,
    });
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ sucess: false, error: "enter both email and password" });
  }

  try {
    const administrator = await Administrator.findOne({ email }).select("+password");

    if (!administrator) {
      res
        .status(404)
        .json({ sucess: false, error: "invalid   email and password" });
    }

    const isMatch = administrator.matchPasswords(password);
    if (!isMatch) {
      res
        .status(404)
        .json({ sucess: false, error: "invalid   email and password" });
    }
    res.status(201).json({ sucess: true, token: "123456" });
  } catch (error) { res
    .status(500)
    .json({ sucess: false, error:error.message });}
};
