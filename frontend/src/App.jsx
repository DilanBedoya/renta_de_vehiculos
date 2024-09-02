import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './paginas/Login';
import Dashboard from './paginas/Dashboard';
//clientes
import ClientsPage from './paginas/clientes/Clientes';
import ActualizarCliente from './paginas/clientes/ActualizarCliente';
import DetalleCliente from './paginas/clientes/DetalleCliente';

//vehiculos
import VehiculosPage from './paginas/vehiculos/Vehiculos';
import ActualizarVehiculo from './paginas/vehiculos/ActualizarVehiculo';
import DetalleVehiculo from './paginas/vehiculos/DetalleVehiculo';

//Reservas
import ReservasPage from './paginas/reservas/Reservas';
import ActualizarReservas from './paginas/reservas/ActualizarylistarReserva';



import { NotFound } from './paginas/NotFound';
import { PrivateRoute } from './routes/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        //publicas
        <Route index element={<Login />} />
        <Route path='*' element={<NotFound />} />

        //privadas
        <Route path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <ClientsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/actualizar/cliente/:clienteId"
          element={
            <PrivateRoute>
              <ActualizarCliente />
            </PrivateRoute>
          }
        />

        <Route
          path="/detalle/cliente/:clienteId"
          element={
            <PrivateRoute>
              <DetalleCliente />
            </PrivateRoute>
          }
        />


        <Route
          path="/vehiculos"
          element={
            <PrivateRoute>
              <VehiculosPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/actualizar/vehiculo/:vehiculoId"
          element={
            <PrivateRoute>
              <ActualizarVehiculo />
            </PrivateRoute>
          }
        />

        <Route
          path="/detalle/vehiculo/:vehiculoId"
          element={
            <PrivateRoute>
              <DetalleVehiculo />
            </PrivateRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <PrivateRoute>
              <ReservasPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/actualizar/reserva/:reservaId"
          element={
            <PrivateRoute>
              <ActualizarReservas />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}