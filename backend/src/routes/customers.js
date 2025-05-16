import express from "express"
const router = express.Router()
import customersController from '../controllers/customersController.js'
// Rutas que no requieren un parámetro específico
router
  .route("/")
  .get(customersController.getCustomers)
  .post(customersController.postCustomers)
// Rutas que requieren un parámetro específico
router
  .route("/:id")
  .get(customersController.getCustomer)
  .put(customersController.putCustomers)
  .delete(customersController.deleteCustomers)
export default router