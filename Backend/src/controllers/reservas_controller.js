import clientes from "../models/clientes.js"
import vehiculos from "../models/vehiculos.js"
import reservas from "../models/reservas.js"
import mongoose from "mongoose"

//Crear reserva

const crearReservaController = async (req, res) => {

    const { codigo, descripcion, cliente, vehiculo } = req.body


    //validar que se completen los campos correctamente
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor completa todos los campos" })
    if (!mongoose.Types.ObjectId.isValid(cliente)) return res.status(400).json({ msg: "Lo sentimos, el id del cliente no es válido" })

    // Validar que todos los campos requeridos estén presentes y no vacíos
    if (!codigo || !descripcion || !cliente || !vehiculo) {
        return res.status(400).json({ msg: "Por favor completa todos los campos" });
    }

    // Verificar si `vehiculo` es un array
    if (!Array.isArray(vehiculo)) {
        return res.status(400).json({ msg: "Lo sentimos, los vehículos deben estar en un array" });
    }

    // Verificar si hay duplicados en el array de vehículos
    const vehiculosUnicos = [...new Set(vehiculo)]; // crear un arreglo con id unicos

    //compara la longitud de los arreglos
    if (vehiculosUnicos.length !== vehiculo.length) {
        return res.status(400).json({ msg: "Lo sentimos, no puedes incluir vehículos duplicados en la reserva" });
    }

    // Verificar cada ID de vehículo en el array
    for (let i = 0; i < vehiculo.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(vehiculo[i])) {
            return res.status(400).json({ msg: `Lo sentimos, el id del vehículo en la posición ${i} no es válido` });
        }
    }

    //validar si el codigo ya se encuentra registrado
    const validarCodigo = await reservas.findOne({ codigo })
    if (validarCodigo) return res.status(404).json({ msg: "Lo sentimos, el código ya se encuentra registrado" })



    //validar si en las reservas el cliente ya tiene reserva
    const validarCliente = await reservas.findOne({ cliente })
    if (validarCliente) return res.status(404).json({ msg: "Lo sentimos, el cliente ya tiene reservas" })


    // Verificar si el cliente existe
    const buscarCliente = await clientes.findById(cliente)
    if (!buscarCliente) return res.status(404).json({ msg: 'Cliente no Seleccionado' })


    // Verificar si el vehículo existe
    const BuscarVehiculo = await vehiculos.findById(vehiculo);
    if (!BuscarVehiculo) return res.status(404).json({ msg: 'Vehículo no Seleccionado' })

    const nuevaReserva = new reservas(req.body);
    await nuevaReserva.save()

    res.status(201).json({ msg: "Reserva Creada con éxito" });

}

//Detalle reserva

const detalleReservaController = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarReserva = await reservas.findById(id)
    if (!buscarReserva) return res.status(404).json({ msg: "Lo sentimos, la reserva no existe" })

    const reservaConDetalles = await reservas.findById(id)
        .populate('cliente', 'nombre apellido cedula ciudad direccion telefono') // Obtener los detalles del cliente
        .populate('vehiculo', 'marca modelo placa color anio_fabricacion tipo_vehiculo kilometraje descripcion'); // Obtener los detalles de los vehículos

    res.status(200).json({ msg: "Detalle de reserva", reservaConDetalles })
}

//Listar las reservas

const listarReservasController = async (req, res) => {
    try {
        // Obtener todos los clientes
        const todosLasReservas = await reservas.find().populate('cliente', 'nombre apellido').populate('vehiculo', 'marca modelo placa').select("-createdAt -updatedAt -__v");


        // Verificar si hay clientes
        if (todosLasReservas.length === 0) {
            return res.status(404).json({ msg: "No se encontraron reservas" });
        }

        // Enviar respuesta con todos los clientes
        res.status(200).json(todosLasReservas);
    } catch (err) {
        // Manejo de errores
        console.error('Error al listar reservas:', err);
        res.status(500).json({ msg: "Hubo un error al listar las reservas" });
    }
};

//Actualizar reserva 

const actualizarReservaController = async (req, res) => {
    const { id } = req.params
    const { vehiculo, ...otrosParametros } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id de la reserva no es válido" })

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor, completa todos los campos" })

    const buscarReserva = await reservas.findByIdAndUpdate(id, req.body)
    if (!buscarReserva) return res.status(404).json({ msg: "Lo sentimos, la reserva no existe" })

    // Verificar si el array de vehículos tiene al menos un vehículo
    if (!Array.isArray(vehiculo) || vehiculo.length === 0) 
        return res.status(400).json({ msg: "Por favor, agrega al menos un vehículo a la reserva" });


    // Verificar si `vehiculo` es un array
    if (!Array.isArray(vehiculo)) {
        return res.status(400).json({ msg: "Lo sentimos, los vehículos deben estar en un array" });
    }

    // Verificar cada ID de vehículo en el array
    for (let i = 0; i < vehiculo.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(vehiculo[i])) {
            return res.status(400).json({ msg: `Lo sentimos, el id del vehículo en la posición ${i} no es válido` });
        }
    }

    // Verificar si hay duplicados en el array de vehículos
    const vehiculosUnicos = [...new Set(vehiculo)]; // crear un arreglo con id unicos

    //compara la longitud de los arreglos
    if (vehiculosUnicos.length !== vehiculo.length) {
        return res.status(400).json({ msg: "Lo sentimos, no puedes incluir vehículos duplicados en la reserva" });
    }

    // Guardar la reserva actualizada
    await buscarReserva.save();

    res.status(200).json({ msg: "Reserva actualizada con éxito" })

}

//Eliminar reserva

const eliminarReservaController = async (req, res) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarReserva = await reservas.findByIdAndDelete(id)
    if (!buscarReserva) return res.status(404).json({ msg: "Lo sentimos, la reserva no existe" })

    res.status(200).json({ msg: "reserva eliminada con éxito" })
}

export {
    crearReservaController,
    detalleReservaController,
    listarReservasController,
    actualizarReservaController,
    eliminarReservaController
}