import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdAssignmentReturn, MdDeleteForever, MdInfo, MdNoteAdd } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';

const Vehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const navigate = useNavigate();

    const listarVehiculos = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos/listar-vehiculos`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            console.log(respuesta.data);
            setVehiculos(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [showForm, setShowForm] = useState(false);
    const [newVehiculo, setNewVehiculo] = useState({
        marca: '',
        modelo: '',
        anio_fabricacion: '',
        placa: '',
        color: '',
        tipo_vehiculo: '',
        kilometraje: '',
        descripcion: ''
    });

    const handleCreateVehiculo = () => {
        setShowForm(true);
    };

    const handleReturnDashboard = () => {
        navigate('/dashboard');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");
            const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos/crear-vehiculo`;
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            };

            const respuesta = await axios.post(url, newVehiculo, { headers });
            console.log(respuesta.data);
            listarVehiculos();
            setShowForm(false);
            setNewVehiculo({
                marca: '',
                modelo: '',
                anio_fabricacion: '',
                placa: '',
                color: '',
                tipo_vehiculo: '',
                kilometraje: '',
                descripcion: ''
            });
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: respuesta.data.msg,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data.msg || 'Ocurrió un error';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVehiculo({
            ...newVehiculo,
            [name]: value
        });
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("¿Estás seguro de eliminar este vehículo?");
            if (confirmar) {
                const token = localStorage.getItem("authToken");
                const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos/eliminar-vehiculo/${id}`;
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                };

                const respuesta = await axios.delete(url, { headers });
                console.log(respuesta.data);
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: respuesta.data.msg,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6'
                });
                listarVehiculos();
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data.msg || 'Ocurrió un error';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    useEffect(() => {
        listarVehiculos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Bienvenido - {localStorage.getItem('name')}</h1>

            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Lista de Vehículos</h2>

            <div className="mb-6 flex justify-between">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleCreateVehiculo}
                >
                    <MdAdd className="inline-block mr-2" />
                    Crear Vehículo
                </button>

                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleReturnDashboard}
                >
                    <MdAssignmentReturn className="inline-block mr-2" />
                    Volver
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Nuevo Vehículo</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="marca">
                            Marca
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="marca"
                            name="marca"
                            type="text"
                            value={newVehiculo.marca}
                            onChange={handleInputChange}
                            placeholder="Marca del vehículo"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="modelo">
                            Modelo
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="modelo"
                            name="modelo"
                            type="text"
                            value={newVehiculo.modelo}
                            onChange={handleInputChange}
                            placeholder="Modelo del vehículo"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="anio_fabricacion">
                            Año de Fabricación
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="anio_fabricacion"
                            name="anio_fabricacion"
                            type="number"
                            value={newVehiculo.anio_fabricacion}
                            onChange={handleInputChange}
                            placeholder="Año de fabricación"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="placa">
                            Placa
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="placa"
                            name="placa"
                            type="text"
                            value={newVehiculo.placa}
                            onChange={handleInputChange}
                            placeholder="Número de placa"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="color">
                            Color
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="color"
                            name="color"
                            type="text"
                            value={newVehiculo.color}
                            onChange={handleInputChange}
                            placeholder="Color del vehículo"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="tipo_vehiculo">
                            Tipo de Vehículo
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="tipo_vehiculo"
                            name="tipo_vehiculo"
                            type="text"
                            value={newVehiculo.tipo_vehiculo}
                            onChange={handleInputChange}
                            placeholder="Tipo de vehículo"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="kilometraje">
                            Kilometraje
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="kilometraje"
                            name="kilometraje"
                            type="number"
                            value={newVehiculo.kilometraje}
                            onChange={handleInputChange}
                            placeholder="Kilometraje del vehículo"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="descripcion">
                            Descripción
                        </label>
                        <textarea
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="descripcion"
                            name="descripcion"
                            value={newVehiculo.descripcion}
                            onChange={handleInputChange}
                            placeholder="Descripción del vehículo"
                        ></textarea>
                    </div>
                    <div className="flex justify-between">

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
                            type="submit"
                        >
                            Guardar Vehículo
                        </button>
                        <button
                            type="button"
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                            onClick={() => setShowForm(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            {vehiculos.length > 0 ? (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-center">N°</th>
                            <th className="py-3 px-6 text-center">Marca</th>
                            <th className="py-3 px-6 text-center">Modelo</th>
                            <th className="py-3 px-6 text-center">Año</th>
                            <th className="py-3 px-6 text-center">Placa</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiculos.map((vehiculo, index) => (
                            <tr key={vehiculo._id} className="border-b border-gray-200">
                                <td className="p-3 px-6 text-center">{index + 1}</td>

                                <td className="py-4 px-6 text-center">{vehiculo.marca}</td>
                                <td className="py-4 px-6 text-center">{vehiculo.modelo}</td>
                                <td className="py-4 px-6 text-center">{vehiculo.anio_fabricacion}</td>
                                <td className="py-4 px-6 text-center">{vehiculo.placa}</td>
                                <td className="py-4 px-6 text-center">

                                    <button
                                        className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => navigate(`/actualizar/vehiculo/${vehiculo._id}`)}
                                    >
                                        <MdNoteAdd />
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => navigate(`/detalle/vehiculo/${vehiculo._id}`)}
                                    >
                                        <MdInfo />
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => handleDelete(vehiculo._id)}
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg text-center">
                    No existen registros de Vehiculos
                </div>
            )}
        </div>
    );
};

export default Vehiculos;
