/*
"Peliulas": [
    {
      "titulo"
      "descripcion"
      "director"
      "genero"
      "anio"
      "duracion"
      "imagen"
    }
] */
// Importamos Schema y model de mongoose
import { Schema, model } from "mongoose"
// Creamos un nuevo Schema con la estructura de los empleados
const moviesSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        filmDirector: { type: String, required: true },
        genre: { type: String, required: true },
        year: { type: Number, required: true, max: 2025 },
        duration: { type: Number, required: true },
        image: { type: String, required: false },
    },
    {
        timestamps: true,
        strict: false
    }
)
// Voy a colocar el tercer argumento para forzar a mongoose que escriba la coleccion en singular
export default model("Movie", moviesSchema, "Movie")