/*
"Clientes": [
    {
      "nombre"
      "correoElectronico"
      "direccion"
      "contraseña"
      "telefono"
      "DUI"
      "estaVerificado"
    }
] */
// Importamos Schema y model de mongoose
import { Schema, model } from "mongoose"
// Creamos un nuevo Schema con la estructura de los empleados
const customersSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        password: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
        DUI: { type: String, required: true },
        isVerified: { type: Boolean, required: true }
    },
    {
        timestamps: true,
        strict: false
    }
)
// Voy a colocar el tercer argumento para forzar a mongoose que escriba la coleccion en singular
export default model("Customer", customersSchema, "Customer")