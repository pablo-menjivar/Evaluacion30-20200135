// Importo mi archivo `app.js`
import app from "./app.js"
// Importo mi archivo `database.js`
import "./database.js"
// Importo la constante `config` de mi archivo `config.js`
import { config } from "./src/utils/config.js"
// Creo una función asincrona para que el servidor corra en el puerto 5000
// Esta ubicada en el .env por razones de seguridad
async function main() {
  app.listen(config.server.PORT)
  // Muestro un mensaje en la consola para saber que el servidor está corriendo
  console.log("Servidor en ejecución")
}
main()