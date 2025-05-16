// Importar la libreria "express"
import express from "express"
// Importar las rutas
import employeesRoutes from "./src/routes/employees.js"
import moviesRoutes from "./src/routes/movies.js"
import customersRoutes from "./src/routes/customers.js"
import signupRoutes from "./src/routes/signup.js"
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"
import signupCustomerRoutes from "./src/routes/signupCustomer.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js"
//Importo la libreria `cookie-parser`
import cookieParser from "cookie-parser"
// Creo una constante que es igual a la libreria que acabo de importar y lo ejecuto
const app = express()
// middleware para aceptar datos desde Postman
app.use(express.json())
// middleware para aceptar cookies en Postman
app.use(cookieParser())
// monta las rutas en la aplicacion
app.use("/api/movies", moviesRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/signup", signupRoutes)
app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/signupCustomers", signupCustomerRoutes)
app.use("/api/recoveryPassword", recoveryPasswordRoutes)
// Exporto el archivo para poder usarlo en otros archivos
export default app