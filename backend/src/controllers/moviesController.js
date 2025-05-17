// Aqui iran todas las funciones para insertar, leer, actualizar y eliminar peliculas
const moviesController = {};
// Importo el modelo de peliculas
import moviesModel from "../models/Movies.js";
// Importo la libreria de `Cloudinary` para guardar las imagenes
import { v2 as cloudinary } from 'cloudinary';
// Importo el archivo 'config'
import { config } from "../utils/config.js"
// Configuro los parametros con los valores del .env
cloudinary.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET
})
// CREATE (POST)
moviesController.postMovies = async (req, res) => {
    const { title, description, filmDirector, genre, year, duration } = req.body;
    let imageURL = ""
    // Subir la imagen a Cloudinary utilizando la API
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "evaluation",
            allowed_formats: ["jpg", "jpeg", "png", "gif"],
        })
        imageURL = result.secure_url
    }
    const newMovie = new moviesModel({ title, description, filmDirector, genre, year, duration, image: imageURL });
    await newMovie.save();
    res.json({ message: "Pelicula guardada" });
};
// READ (GET)
moviesController.getMovies = async (req, res) => {
  const movies = await moviesModel.find();
  res.json(movies);
};
// UPDATE (PUT)
moviesController.putMovies = async (req, res) => {
  const {title, description, filmDirector, genre, year, duration} = req.body;
  let imageURL = ""
  // Subir la imagen a Cloudinary utilizando la API
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "public",
      allowed_formats: ["jpg", "jpeg", "png", "gif"],
    })
      imageURL = result.secure_url
  }
  await moviesModel.findByIdAndUpdate(req.params.id, {title, description, filmDirector, genre, year, duration, image: imageURL}, { new: true });
  res.json({ message: "Pelicula actualizada" });
};
// DELETE (DELETE)
moviesController.deleteMovies = async (req, res) => {
  const deletedMovie = await moviesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Pelicula eliminada" });
};
// READ 1 Empleado BY ID
moviesController.getMovie = async (req, res) => {
  const movie = await moviesModel.findById(req.params.id);
  res.json(movie);
};
// Exporto el controlador para poder usarlo en otros archivos
export default moviesController