import { Router } from "express";
const router = Router()

import {
    crearClientesController,
    detalleClienteController,
    listarClientesController,
    actualizarClienteController,
    eliminarClienteController
} from "../controllers/clientes_controller.js";

import autenticacionUsuario from "../middlewares/autenticacionUsuario.js";

//Crear
router.post("/clientes/crear-cliente", autenticacionUsuario, crearClientesController)
//Detalle
router.get("/clientes/detalle-cliente/:id", autenticacionUsuario, detalleClienteController)
router.get("/clientes/listar-clientes", autenticacionUsuario, listarClientesController)

// //Actualizar
router.put("/clientes/actualizar-cliente/:id", autenticacionUsuario, actualizarClienteController)
// //Eliminar
router.delete("/clientes/eliminar-cliente/:id", autenticacionUsuario, eliminarClienteController)


export default router

