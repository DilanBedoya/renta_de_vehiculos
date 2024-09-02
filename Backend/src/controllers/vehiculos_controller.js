
import mongoose from "mongoose"
import vehiculos from "../models/vehiculos.js"
import reservas from "../models/reservas.js"

//Crear vehiculo
const crearVehiculoController = async (req, res) => {
    //especificar en año de fabricacion : año
    const { placa, marca, modelo, anio_fabricacion, color, tipo_vehiculo, kilometraje, descripcion } = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor, completa todos los campos" })

    // Validar que todos los campos estén presentes y no vacíos
    if (!placa || !marca || !modelo || !anio_fabricacion || !color || !tipo_vehiculo || !kilometraje || !descripcion) {
        return res.status(400).json({ msg: "Por favor, completa todos los campos" });
    }

    // Validar que los campos que deben ser numéricos efectivamente lo sean
    if (isNaN(kilometraje)) {
        return res.status(400).json({ msg: "Kilometraje debe ser valores numéricos" });
    }

    const validarPlaca = await vehiculos.findOne({ placa })
    if (validarPlaca) return res.status(404).json({ msg: "Lo sentimos, la placa del vehículo ya se encuentra registrado" })

    const nuevoVehiculo = new vehiculos(req.body)
    await nuevoVehiculo?.save()


    res.status(200).json({ msg: "vehículo creado con éxito", nuevoVehiculo })
}


//Detalle vehiculo

const detalleVehiculoController = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarVehiculo = await vehiculos.findById(id)
    if (!buscarVehiculo) return res.status(404).json({ msg: "Lo sentimos, el vehículo no existe" })

    res.status(200).json(buscarVehiculo)
}

//Listar los vehiculos

const listarVehiculosController = async (req, res) => {
    try {
        // Obtener todos los clientes
        const todosLosVehiculos = await vehiculos.find().select("-createdAt -updatedAt -__v");


        // Verificar si hay clientes
        if (todosLosVehiculos.length === 0) {
            return res.status(404).json({ msg: "No se encontraron vehiculos" });
        }

        // Enviar respuesta con todos los clientes
        res.status(200).json(todosLosVehiculos);
    } catch (err) {
        // Manejo de errores
        console.error('Error al listar vehiculos:', err);
        res.status(500).json({ msg: "Hubo un error al listar los vehiculos" });
    }
};

//Actualizar Vehículo 

const actualizarVehiculoController = async (req, res) => {
    const { id } = req.params
    const { kilometraje } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor, completa todos los campos" })

    // Validar que los campos que deben ser numéricos efectivamente lo sean
    if (isNaN(kilometraje)) {
        return res.status(400).json({ msg: "Kilometraje debe ser valores numéricos" });
    }

    const buscarVehiculo = await vehiculos.findByIdAndUpdate(id, req.body)
    if (!buscarVehiculo) return res.status(404).json({ msg: "Lo sentimos, el vehículo no existe" })

    res.status(200).json({ msg: "Vehículo actualizado con éxito" })

}

//Eliminar Vehículo

const eliminarVehiculoController = async (req, res) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarVehiculo = await vehiculos.findById(id)
    if (!buscarVehiculo) return res.status(404).json({ msg: "Lo sentimos, el Vehículo no existe" })

    // Verificar si el vehiculo tiene reservas asociadas
    const reservaExistente = await reservas.findOne({ 'vehiculo': id });
    if (reservaExistente) return res.status(400).json({ msg: "No se puede eliminar el vehículo porque tiene reservas asociadas" });

    // Eliminar el cliente
    await vehiculos.findByIdAndDelete(id);

    res.status(200).json({ msg: "Vehículo eliminado con éxito" })
}


export {
    crearVehiculoController,
    detalleVehiculoController,
    listarVehiculosController,
    actualizarVehiculoController,
    eliminarVehiculoController
}
