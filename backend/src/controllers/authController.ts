import express from "express";
import { addTokenToResponse } from "../utils/auth";
import bcrypt from "bcrypt";
import { withUser } from "../utils/authMiddleware";
import User from "../models/user";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, contact, password } = req.body;
    if (!username || !contact?.email || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const existing_email = await User.findOne({ "contact.email": contact.email });
    if (existing_email) {
      return res.status(400).json({ error: "Email ya registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name:username,
      contact,
      password: passwordHash,
    });

    res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.contact.email });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email y contraseña requeridos" });

  const user = await User.findOne({ "contact.email": email });
  if (!user) return res.status(401).json({ error: "Correo o contraseña incorrectos" });

  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) return res.status(401).json({ error: "Correo o contraseña incorrectos" });

  const resToken = addTokenToResponse(res, user);
  return resToken.status(200).json({ id: user.id, name: user.name, email: user.contact.email });
});

router.get("/me", withUser, async (req, res) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Sesión cerrada" });
});

export default router;