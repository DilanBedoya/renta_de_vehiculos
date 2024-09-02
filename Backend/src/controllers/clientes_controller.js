import clientes from "../models/clientes.js"
import reservas from "../models/reservas.js"

import mongoose from "mongoose"


//Crear clientes
const crearClientesController = async (req, res) => {
    //especificar en fecha de nacimiento : año-mes-dia
    const { cedula, email, nombre, apellido, fecha_nacimiento, ciudad, direccion, telefono } = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor completa todos los campos" })

    // Validar que todos los campos requeridos estén presentes y no vacíos
    if (!cedula || !email || !nombre || !fecha_nacimiento || !apellido || !ciudad || !direccion || !telefono) {
        return res.status(400).json({ msg: "Por favor completa todos los campos" });
    }

    // Validar que los campos que deben ser numéricos efectivamente lo sean
    if (isNaN(cedula) || isNaN(telefono)) {
        return res.status(400).json({ msg: "Cédula o teléfono deben ser valores numéricos" });
    }

    const validarCedula = await clientes.findOne({ cedula })
    if (validarCedula) return res.status(404).json({ msg: "Lo sentimos, la cédula del cliente ya se encuentra registrado" })


    const validarEmail = await clientes.findOne({ email })
    if (validarEmail) return res.status(404).json({ msg: "Lo sentimos, el email del cliente ya se encuentra registrado" })

    const nuevoCliente = new clientes(req.body)
    await nuevoCliente?.save()


    res.status(200).json({ msg: "Cliente creado con éxito", nuevoCliente })
}


//Detalle cliente

const detalleClienteController = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarCliente = await clientes.findById(id)
    if (!buscarCliente) return res.status(404).json({ msg: "Lo sentimos, el cliente no existe" })

    res.status(200).json(buscarCliente)
}

//Listar los clientes

const listarClientesController = async (req, res) => {
    try {
        // Obtener todos los clientes
        const todosLosClientes = await clientes.find().select("-createdAt -updatedAt -__v");


        // Verificar si hay clientes
        if (todosLosClientes.length === 0) {
            return res.status(404).json({ msg: "No se encontraron clientes" });
        }

        // Enviar respuesta con todos los clientes
        res.status(200).json(todosLosClientes);
    } catch (err) {
        // Manejo de errores
        console.error('Error al listar clientes:', err);
        res.status(500).json({ msg: "Hubo un error al listar los clientes" });
    }
};

//Actualizar cliente 

const actualizarClienteController = async (req, res) => {
    const { id } = req.params
    const { cedula, telefono } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor, completa todos los campos" })


    // Validar que los campos que deben ser numéricos efectivamente lo sean
    if (isNaN(cedula) || isNaN(telefono)) {
        return res.status(400).json({ msg: "Cédula o teléfono deben ser valores numéricos" });
    }

    const buscarCliente = await clientes.findByIdAndUpdate(id, req.body)
    if (!buscarCliente) return res.status(404).json({ msg: "Lo sentimos, el cliente no existe" })

    res.status(200).json({ msg: "Cliente actualizado con éxito" })

}

//Eliminar cliente

const eliminarClienteController = async (req, res) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarCliente = await clientes.findById(id)
    if (!buscarCliente) return res.status(404).json({ msg: "Lo sentimos, el cliente no existe" })

    // Verificar si el cliente tiene reservas asociadas
    const reservaExistente = await reservas.findOne({ 'cliente': id });
    if (reservaExistente) return res.status(400).json({ msg: "No se puede eliminar el cliente porque tiene reservas asociadas" });

    // Eliminar el cliente
    await clientes.findByIdAndDelete(id);
    
    res.status(200).json({ msg: "Cliente eliminado con éxito" })
}


export {
    crearClientesController,
    detalleClienteController,
    listarClientesController,
    actualizarClienteController,
    eliminarClienteController
}
