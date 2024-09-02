import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdAssignmentReturn } from 'react-icons/md';
import Swal from 'sweetalert2';

const ActualizarVehiculo = () => {
    const { vehiculoId } = useParams(); // Obtén el ID del vehículo de la URL
    const [vehiculo, setVehiculo] = useState(null);
    const [form, setForm] = useState({
        marca: '',
        modelo: '',
        anio_fabricacion: '',
        color: '',
        placa: '',
        kilometraje: '',
        tipo_vehiculo:'',
        descripcion:''
    });
    const navigate = useNavigate();

    const handleReturnVehiculo = () => {
        navigate('/vehiculos');
    };

    useEffect(() => {
        const fetchVehiculo = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos/detalle-vehiculo/${vehiculoId}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setVehiculo(respuesta.data);
                setForm({
                    marca: respuesta.data.marca,
                    modelo: respuesta.data.modelo,
                    anio_fabricacion: respuesta.data.anio_fabricacion,
                    color: respuesta.data.color,
                    placa: respuesta.data.placa,
                    kilometraje: respuesta.data.kilometraje,
                    tipo_vehiculo: respuesta.data.tipo_vehiculo,
                    descripcion: respuesta.data.descripcion
                });
            } catch (error) {
                console.error('Error al obtener el vehículo:', error);
            }
        };
        fetchVehiculo();
    }, [vehiculoId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos/actualizar-vehiculo/${vehiculoId}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.put(url, form, options);
            navigate('/vehiculos'); // Redirige a la lista de vehículos o a otra página

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: respuesta.data.msg,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        } catch (error) {
            console.error(error);
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

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Actualizar Vehículo</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca</label>
                    <input
                        id="marca"
                        name="marca"
                        type="text"
                        value={form.marca}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">Modelo</label>
                    <input
                        id="modelo"
                        name="modelo"
                        type="text"
                        value={form.modelo}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="anio_fabricacion" className="block text-sm font-medium text-gray-700">Año</label>
                    <input
                        id="anio_fabricacion"
                        name="anio_fabricacion"
                        type="number"
                        value={form.anio_fabricacion}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                    <input
                        id="color"
                        name="color"
                        type="text"
                        value={form.color}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="placa" className="block text-sm font-medium text-gray-700">Placa</label>
                    <input
                        id="placa"
                        name="placa"
                        type="text"
                        value={form.placa}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="kilometraje" className="block text-sm font-medium text-gray-700">kilometraje</label>
                    <input
                        id="kilometraje"
                        name="kilometraje"
                        type="number"
                        value={form.kilometraje}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tipo_vehiculo" className="block text-sm font-medium text-gray-700">Tipo de Vehiculo</label>
                    <input
                        id="tipo_vehiculo"
                        name="tipo_vehiculo"
                        type="text"
                        value={form.tipo_vehiculo}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div><div className="mb-4">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input
                        id="descripcion"
                        name="descripcion"
                        type="text"
                        value={form.descripcion}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div className="mb-6 flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Guardar Cambios
                    </button>

                    {/* Botón para volver a los vehículos */}
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
                        onClick={handleReturnVehiculo}
                    >
                        <MdAssignmentReturn className="inline-block mr-2" />
                        Volver
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ActualizarVehiculo;
