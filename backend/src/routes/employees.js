import express from "express"
const router = express.Router()
import employeesController from "../controllers/employeesController.js"
// Rutas que no requieren un parámetro en específico
router
  .route("/")
  .get(employeesController.getEmployees)
  .post(employeesController.postEmployees)
// Rutas que utilizan el id como parametro
router
  .route("/:id")
  .get(employeesController.getEmployee)
  .put(employeesController.putEmployees)
  .delete(employeesController.deleteEmployees)
export default router