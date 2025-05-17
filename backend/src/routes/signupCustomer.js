import express from "express"
const router = express.Router()
// Importo el controlador de registro
import signupCustomerController from "../controllers/signupCustomerController.js"
// rutas para registrarse y para verificar el codigo de verificacion de correo electrónico
router.route("/").post(signupCustomerController.registerCustomer)
router.route("/verifyCodeEmail").post(signupCustomerController.verifyCodeEmail)

export default router