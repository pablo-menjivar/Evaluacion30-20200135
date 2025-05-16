// Aqui iran todas las funciones para insertar, leer, actualizar y eliminar clientes
const customersController = {};
// Importo el modelo de clientes
import customersModel from "../models/Customers.js";
// CREATE (POST)
customersController.postCustomers = async (req, res) => {
  const {name, email, address, password, phoneNumber, DUI} = req.body;
  const newCustomer = new customersModel({name, email, address, password, phoneNumber, DUI});

  await newCustomer.save();
  res.json({ message: "Cliente guardado" });
};
// READ (GET)
customersController.getCustomers = async (req, res) => {
  const customers = await customersModel.find();
  res.json(customers);
};
// UPDATE (PUT)
customersController.putCustomers = async (req, res) => {
  const {name, email, address, password, phoneNumber, DUI} = req.body;
  const updatedCustomer = await customersModel.findByIdAndUpdate(req.params.id, {name, email, address, password, phoneNumber, DUI}, { new: true });
  res.json({ message: "Cliente actualizado" });
};
// DELETE (DELETE)
customersController.deleteCustomers = async (req, res) => {
  const deleteCustomer = await customersModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Cliente eliminado" });
};
// READ 1 Cliente BY ID
customersController.getCustomer = async (req, res) => {
  const customer = await customersModel.findById(req.params.id);
  res.json(customer);
};
// Exporto el controlador para poder usarlo en otros archivos
export default customersController