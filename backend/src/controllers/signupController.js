// Este controlador es para el registro de empleados
const signupController = {}
// Importo el modelo de empleados
import employeesModel from "../models/Employees.js"
// Importo la libreria `bcryptjs`
import bcryptjs from "bcryptjs"
// Importo la libreria `jsonwebtoken`
import jsonwebtoken from "jsonwebtoken"
// Importo el archivo `config`
import { config } from "../utils/config.js"
//POST (CREATE)
signupController.registerEmployee = async (req, res) => {
    const {name, email, address, hireDate, role, password, phoneNumber, DUI, salary} = req.body

    try {
        //Verificación de si el empleado ya existe o no, si no, se va a registrar 2 veces
        const employeeExist = await employeesModel.findOne({email})
        //Si existe un empleado, entonces se va a responder con un mensaje de error
        if(employeeExist){
            return res.json({message: "El empleado ya existe"})
        }
        //Encriptacion de contraseña
        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = new employeesModel({name, email, address, hireDate, role, password: hashedPassword, phoneNumber, DUI, salary})

        await newUser.save()
        //TOKEN
        jsonwebtoken.sign({id: newUser._id}, config.JWT.secret, { expiresIn: config.JWT.expiresIn}, (err, token) => {
            if(err) console.log("error")
            res.cookie("authToken", token)

            res.json({message: "Registro exitoso"})
        })
        res.json({message: "Empleado registrado"})
    } catch (error) {
        console.log("error", error)
        res.json({message: "Error al registrar el empleado ", error: error.message})
    }
}
export default signupController