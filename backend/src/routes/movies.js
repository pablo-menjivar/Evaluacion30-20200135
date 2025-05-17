import express from "express"
import multer from "multer"
const router = express.Router()
// Carpeta local que guarde los registros (.logs) de las imágenes subidas a Cloudinary
const upload = multer({dest: "evaluation/"})
import moviesController from "../controllers/moviesController.js"
// Rutas que no requieren un parámetro en específico
router
  .route("/")
  .get(moviesController.getMovies)
  .post(upload.single("image"), moviesController.postMovies)
// Rutas que utilizan el id como parametro
router
  .route("/:id")
  .get(moviesController.getMovie)
  .put(upload.single("image"), moviesController.putMovies)
  .delete(moviesController.deleteMovies)
export default router