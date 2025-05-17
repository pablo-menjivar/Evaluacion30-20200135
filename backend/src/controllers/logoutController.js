// Controlador para que los usuarios puedan cerrar sesion
const logoutController = {}
//POST (CREATE)
logoutController.logout = async (req, res) => {
    //Se borra la cookie que contiene el token para que el usuario no pueda volver a iniciar sesion con ese mismo token
    res.clearCookie("authToken")
    res.json({message: "Sesión cerrada correctamente"})
}
export default logoutController