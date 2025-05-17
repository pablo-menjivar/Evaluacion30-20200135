import express from "express"
const router = express.Router()
// Importo el controlador de login
import loginController from "../controllers/loginController.js"
// ruta del Post o Create
router.route("/").post(loginController.login)

export default router