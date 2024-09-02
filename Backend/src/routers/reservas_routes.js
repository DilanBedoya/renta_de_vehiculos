import { Router } from "express";
const router = Router()

import {
    crearReservaController,
    detalleReservaController,
    listarReservasController,
    actualizarReservaController,
    eliminarReservaController

} from "../controllers/reservas_controller.js";

import autenticacionUsuario from "../middlewares/autenticacionUsuario.js";

//Crear
router.post("/reservas/crear-reserva", autenticacionUsuario, crearReservaController)
//Detalle
router.get("/reservas/detalle-reserva/:id", autenticacionUsuario, detalleReservaController)
router.get("/reservas/listar-reservas", autenticacionUsuario, listarReservasController)
// //Actualizar
router.put("/reservas/actualizar-reserva/:id", autenticacionUsuario, actualizarReservaController)
// //Eliminar
router.delete("/reservas/eliminar-reserva/:id", autenticacionUsuario, eliminarReservaController)


export default router

