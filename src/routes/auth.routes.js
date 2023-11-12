import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router(); //creamos un objeto router para manejar las rutas

router.post('/register', register) //ruta para registrar un usuario
router.post('/login', login) //ruta para logear un usuario
router.post('/logout', logout)//ruta para deslogear un usuario
router.get('/profile', authRequired, profile) //ruta para obtener el perfil de un usuario (para crear rutas protegidas)

export default router;