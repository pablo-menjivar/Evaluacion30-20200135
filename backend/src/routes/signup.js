import express from "express"
const router = express.Router()
// Importo el controlador de registro
import signupController from "../controllers/signupController.js"
// ruta del Post o Create
router.route("/").post(signupController.registerEmployee)

export default router