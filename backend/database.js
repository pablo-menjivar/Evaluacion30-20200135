import mongoose from "mongoose"
// Importo la constante `config` de mi archivo `config.js`
import { config } from "./src/utils/config.js"
// Conecto a la base de datos por medio de la URI en el .env
mongoose.connect(config.db.URI)
// ----- Revisar el comportamiento de la base de datos -----
const connection = mongoose.connection
// Veo si funciona
connection.once("open", () => {
  console.log("Base de datos conectada")
})
// Veo si se desconecto
connection.on("disconnected", () => {
  console.log("La base de datos se desconectó")
})
// Veo si hay un error
connection.on("error", () => {
  console.log("Error al conectarse a la base de datos")
})