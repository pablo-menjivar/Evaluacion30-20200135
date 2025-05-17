// Aqui irá un método de POST para que tanto empleados como clientes puedan iniciar sesión
const loginController = {}
import loginModel from "../models/Employees.js"
import customersModel from "../models/Customers.js"
// Importo la libreria `bcryptjs`
import bcryptjs from "bcryptjs"
// Importo la libreria `jsonwebtoken`
import jsonwebtoken from "jsonwebtoken"
// Importo el archivo `config`
import { config } from "../utils/config.js"
// POST (CREATE)
loginController.login = async (req, res) => {
    const {email, password} = req.body

    try {
        let userFound //Se guarda el usuario encontrado
        let userType //Se guarda el tipo de usuario (admin o employee)
        if (email === config.CREDENTIALS.email && password === config.CREDENTIALS.password) {
            userType = "admin",
            userFound = {_id: "admin"}
        } else {
            //Para ver si es empleado o no
            userFound = await loginModel.findOne({email})
            if (userFound) {
                // Establecer tipo de usuario basado en el puesto
                if (userFound.role === "vendedor" || userFound.role === "gerente") {
                    userType = userFound.role
                } else {
                    userType = "employee"
                }
            } else {
                // Si no encuentra nada revisar los clientes
                userFound = await customersModel.findOne({ email: "customer" })
                if (userFound) {
                    userType = "customer"
                }
            }
        }
        //Si el usuario DE VERDAD NO FUE ENCONTRADO se va a responder con un mensaje de error
        if (!userFound) {
            return res.json({message: "El usuario no existe"})
        } 
        //Desencriptar la contraseña si el usuario no es admin
        if (userType !== "admin") {
            //Variable para almacenar el hash de la contraseña
            const isMatch = bcryptjs.compare(password, userFound.password)
            if (!isMatch) {
                return res.json({message: "Contraseña incorrecta"})
            }
        }
        //TOKEN
        jsonwebtoken.sign({id: userFound._id}, config.JWT.secret, { expiresIn: config.JWT.expiresIn}, (err, token) => {
            if(err) console.log("error")
            res.cookie("authToken", token)

            res.json({message: "Inicio de sesión exitoso"})
        })
    } catch (error) {
        console.log("error", error)
        res.json({message: "Error al iniciar sesión", error: error.message})
    }
}
export default loginController