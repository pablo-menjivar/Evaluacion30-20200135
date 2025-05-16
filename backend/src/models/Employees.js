/*
"Empleados": [
    {
      "nombre"
      "correoElectronico"
      "direccion"
      "fechaContratacion"
      "puesto"
      "contraseña"
      "telefono"
      "DUI"
      "salario"
    }
] */
// Importamos Schema y model de mongoose
import { Schema, model } from "mongoose"
// Creamos un nuevo Schema con la estructura de los empleados
const employeesSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        hireDate: { type: Date, required: true },
        workingPlace: { type: String, required: true },
        password: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
        DUI: { type: String, required: true },
        salary: { type: Number, required: true },
    },
    {
        timestamps: true,
        strict: false
    }
)
// Voy a colocar el tercer argumento para forzar a mongoose que escriba la coleccion en singular
export default model("Employee", employeesSchema, "Employee")