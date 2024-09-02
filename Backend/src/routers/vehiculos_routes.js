import { Router } from "express";
const router = Router()

import {
    crearVehiculoController,
    detalleVehiculoController,
    listarVehiculosController,
    actualizarVehiculoController,
    eliminarVehiculoController

} from "../controllers/vehiculos_controller.js";

import autenticacionUsuario from "../middlewares/autenticacionUsuario.js";

//Crear
router.post("/vehiculos/crear-vehiculo", autenticacionUsuario, crearVehiculoController)
// //Detalle
router.get("/vehiculos/detalle-vehiculo/:id", autenticacionUsuario, detalleVehiculoController)
router.get("/vehiculos/listar-vehiculos", autenticacionUsuario, listarVehiculosController)
// // //Actualizar
router.put("/vehiculos/actualizar-vehiculo/:id", autenticacionUsuario, actualizarVehiculoController)
// // //Eliminar
router.delete("/vehiculos/eliminar-vehiculo/:id", autenticacionUsuario, eliminarVehiculoController)


export default router

