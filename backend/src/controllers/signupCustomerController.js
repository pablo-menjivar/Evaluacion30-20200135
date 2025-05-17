// Aqui en el controlador, irán el método de CREATE (C) que se utilizará en la ruta de registro
//Array de funciones vacías
const signupCustomerController = {}
// Importo el modelo de clientes
import customersModel from "../models/Customers.js"
// Importo la libreria 'bcryptjs'
import bcryptjs from "bcryptjs"
// Importo la libreria 'jsonwebtoken'
import jsonwebtoken from "jsonwebtoken"
// Importo la libreria 'nodemailer'
import nodemailer from 'nodemailer'
// Importo la libreria 'crypto'
import crypto from 'crypto'
// Importo el archivo 'config'
import { config } from "../utils/config.js"
//Post (CREATE)
signupCustomerController.registerCustomer = async (req, res) => {
    const {name, email, address, password, phoneNumber, DUI, isVerified} = req.body
    try {
        //Verificación de si el cliente ya existe o no, si no, se va a registrar 2 veces
        const customerExist = await customersModel.findOne({email})
        //Si existe, entonces se va a responder con un mensaje de error
        if(customerExist){
            return res.json({message: "El cliente ya existe"})
        }
        //Encriptacion de contraseña
        const hashedPassword = await bcryptjs.hash(password, 10)
        const newCustomer = new customersModel({name, email, address, password: hashedPassword, phoneNumber, DUI: DUI || null, isVerified: isVerified || false})

        await newCustomer.save()
        //Generar un código aleatorio con la libreria 'Crypto'
        const verCode = crypto.randomBytes(3).toString('hex')
        //TOKEN
        const token = jsonwebtoken.sign({email, verCode}, config.JWT.secret, { expiresIn: "2h"})
        res.cookie("verificationToken", token, {maxAge: 2 * 60 * 60 * 1000})
        //Enviar el correo electrónico con el código aleatorio
        //Configuración del correo electrónico, transporter => quien lo envió
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.APPUSER.USER,
                pass: config.APPUSER.PASS
            }
        })
        //Configuración del correo electrónico, mailOptions => qué envía
        const mailOptions = {
            from: config.APPUSER.USER,
            to: email,
            subject: 'Verificación de cuenta',
            text: `Por favor, ingrese el siguiente código para verificar su cuenta: ${verCode}`
        }
        //Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error", error)
                return res.json({message: "Error al enviar el correo electrónico", error: error.message})
            }
            console.log("Correo electrónico enviado", info.response)
            res.json({message: "Código de verificación enviado"});
        })
        res.json({message: "Cliente registrado, por favor verifica tu correo"})
    } catch (error) {
        console.log("error", error)
        res.json({message: "Error al registrar el empleado", error: error.message})
    }
}
//Verificar el código de verificación
signupCustomerController.verifyCodeEmail = async (req, res) => {
    const {verCodeRequest} = req.body
    //TOKEN
    const token = req.cookies.verificationToken
    //Verificar y decodificar el token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret)
    const {email, verCode: storedCode} = decoded
    //Comparar los códigos
    if (verCodeRequest !== storedCode) {
        return res.json({message: "Código de verificación incorrecto"})
    } 
    //Si el código es correcto, actualizar el estado del cliente a "verified" 
    const customer = await customersModel.findOne({email})
    customer.isVerified = true
    await customer.save()

    res.clearCookie("verificationToken")
    res.json({message: "Cuenta verificada exitosamente"})
}
export default signupCustomerController