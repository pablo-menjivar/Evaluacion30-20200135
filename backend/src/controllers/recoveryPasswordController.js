// En este controlador se encuentran tres metodos de POST que se encargan de enviar un codigo de recuperacion a un cliente
// verificar el código de recuperacion y cambiar la contraseña del cliente
const recoveryPasswordController = {}
import customersModel from "../models/Customers.js"
import employeesModel from "../models/Employees.js"
// Importo la libreria 'bcryptjs'
import bcryptjs from "bcryptjs"
// Importo la libreria 'jsonwebtoken'
import jsonwebtoken from "jsonwebtoken"
// Importo las constantes 'sendEmail' y 'HTMLRecoveryEmail' del archivo 'utils/mailRecoveryPassword.js'
import { sendEmail, HTMLRecoveryEmail } from "../utils/mailRecoveryPassword.js"
// Importo el archivo 'config'
import { config } from "../utils/config.js"
//Post (Create)
recoveryPasswordController.requestCode = async (req, res) => {
    //Obtener el email del cuerpo de la solicitud
    const email = req.body.email
    try {
        let userFound
        let userType
        //Verificación de si el usuario ya existe o no, si no, se va a registrar 2 veces
        userFound = await customersModel.findOne({email: req.body.email})
        if (userFound){
            userType = "customer"
        } else {
            userFound = await loginModel.findOne({email: req.body.email})
            if (userFound) {
                // Establecer tipo de usuario basado en el puesto
                if (userFound.role === "vendedor" || userFound.role === "gerente") {
                    userType = userFound.role
                } else {
                    userType = "employee"
                }
            } else {
                return res.json({message: "El cliente no existe"})
            }
        }
        if (!userFound) {
            return res.json({message: "El usuario no existe"})
        }
        //Generar un código aleatorio para enviarselo al cliente
        const code = Math.floor(10000 + Math.random() * 90000).toString()
        //TOKEN
        const token = jsonwebtoken.sign({email, code, userType, verified: false}, config.JWT.secret, { expiresIn: "20m"})
        //El token se almacenará en una cookie
        res.cookie("tokenRecoveryCode", token, {maxAge: 2*60*1000})
        //Enviar el correo electrónico
        await sendEmail(email, "Código de recuperación de contraseña", `Tu código de recuperación es: ${code}`, HTMLRecoveryEmail(code))
        res.json({message: "Código de recuperación enviado"})
    } catch (err) {
        console.log("error: ", err)
    }
}
//Verificacion de codigo
recoveryPasswordController.verifyCode = async (req, res) => {
    const { code } = req.body

    try {
        const token = req.cookies.tokenRecoveryCode
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        //Comparar con el código que el usuario escribe con el codigo que está guardado en el token
        if (decoded.code !== code) {
            res.json({message: "Código incorrecto"})
        }
        //TOKEN
        const newToken = jsonwebtoken.sign({email: decoded.email, code: decoded.code, userType: decoded.userType, verified: true}, config.JWT.secret, { expiresIn: "20m"})

        res.cookie("tokenRecoveryCode", newToken, {maxAge: 24*60*1000})
        res.json({message: "Código de recuperación verificado"})
    } catch (err) {
        console.log("error: ", err)
    }
}
//Cambiar contraseña
recoveryPasswordController.changePassword = async (req, res) => {
    const { newPassword } = req.body
    try {
        const token = req.cookies.tokenRecoveryCode
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        //Comprobar si el código fue verificado
        if (!decoded.verified) {
            return res.json({message: "Código no verificado"})
        }
        //Obtener el email y el tipo de usuario
        const { email, userType } = decoded
        //Encriptar la contraseña
        const hashedPassword = await bcryptjs.hash(newPassword, 8)
        //Nuevo usuario
        let updatedUser
        //Actualizar la contraseña del usuario
        if (userType === "customer") {
            updatedUser = await customersModel.findOneAndUpdate({email}, {password: hashedPassword}, {new: true})
        } else if (userType === "vendedor" || userType === "gerente") {
            updatedUser = await employeesModel.findOneAndUpdate({email}, {password: hashedPassword}, {new: true})
        } else {
            return res.json({message: "Tipo de usuario no válido"})
        }
        //Eliminar la cookie
        res.clearCookie("tokenRecoveryCode")
        res.json({message: "Contraseña cambiada"})
    } catch (err) {
        console.log("error: ", err)
    }
}
//Exportar el controlador
export default recoveryPasswordController