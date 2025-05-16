import express from "express"
const router = express.Router()
import moviesController from "../controllers/moviesController.js"
// Rutas que no requieren un parámetro en específico
router
  .route("/")
  .get(moviesController.getMovies)
  .post(moviesController.postMovies)
// Rutas que utilizan el id como parametro
router
  .route("/:id")
  .get(moviesController.getMovie)
  .put(moviesController.putMovies)
  .delete(moviesController.deleteMovies)
export default router