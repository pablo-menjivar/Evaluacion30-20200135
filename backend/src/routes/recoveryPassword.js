import express from "express"
const router = express.Router()
// Importo el controlador de recuperar contraseña
import recoveryPasswordController from "../controllers/recoveryPasswordController.js"
// Las 3 rutas (todas son post) para solicitar, verificar y cambiar
router.route("/requestCode").post(recoveryPasswordController.requestCode)
router.route("/verifyCode").post(recoveryPasswordController.verifyCode)
router.route("/changePassword").post(recoveryPasswordController.changePassword)
// Exporto el router para poder usarlo en otros archivos
export default router