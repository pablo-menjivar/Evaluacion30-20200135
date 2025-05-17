import express from "express"
const router = express.Router()
// Importo el controlador de login
import logoutController from "../controllers/logoutController.js"
// ruta del Post o Create
router.route("/").post(logoutController.logout)

export default router