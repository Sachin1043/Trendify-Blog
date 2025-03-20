const express = require("express");
const { getLogin, login, getRegister, register, logout } = require("../controllers/authControllers");

const userRoutes = express.Router();

// Routes
userRoutes.get("/login", getLogin);
userRoutes.post("/login", login);
userRoutes.get("/register", getRegister);
userRoutes.post("/register", register);
userRoutes.get("/logout", logout);

module.exports = userRoutes;
