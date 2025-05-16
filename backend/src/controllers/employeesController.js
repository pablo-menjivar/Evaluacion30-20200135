// Aqui iran todas las funciones para insertar, leer, actualizar y eliminar empleados
const employeesController = {};
// Importo el modelo de empleados
import employeesModel from "../models/Employees.js";
// CREATE (POST)
employeesController.postEmployees = async (req, res) => {
  const {name, email, address, hireDate, role, password, phoneNumber, DUI, salary} = req.body;
  const newEmployee = new employeesModel({name, email, address, hireDate, role, password, phoneNumber, DUI, salary});

  await newEmployee.save();
  res.json({ message: "Empleado guardado" });
};
// READ (GET)
employeesController.getEmployees = async (req, res) => {
  const employees = await employeesModel.find();
  res.json(employees);
};
// UPDATE (PUT)
employeesController.putEmployees = async (req, res) => {
  const {name, email, address, password, phoneNumber, DUI} = req.body;
  const updatedEmployee = await employeesModel.findByIdAndUpdate(req.params.id, {name, email, address, password, phoneNumber, DUI}, { new: true });
  res.json({ message: "Empleado actualizado" });
};
// DELETE (DELETE)
employeesController.deleteEmployees = async (req, res) => {
  const deleteEmployee = await employeesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Empleado eliminado" });
};
// READ 1 Empleado BY ID
employeesController.getEmployee = async (req, res) => {
  const employee = await employeesModel.findById(req.params.id);
  res.json(employee);
};
// Exporto el controlador para poder usarlo en otros archivos
export default employeesController