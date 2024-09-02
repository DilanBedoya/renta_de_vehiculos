import express, { Router } from "express"
import cors from "cors"
import dotenv from "dotenv"
import routerUsuario from "./routers/usuario_routes.js"
import routerCliente from "./routers/clientes_routes.js"
import routerVehiculo from "./routers/vehiculos_routes.js"
import routerReservas from "./routers/reservas_routes.js"

const app = express()
dotenv.config()

app.set("port", process.env.port || 3000 ) 

app.use(cors())
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Server on")
})


//Routes
app.use("/api", routerUsuario)
app.use("/api", routerCliente)
app.use("/api", routerVehiculo)
app.use("/api", routerReservas)


//Ruta no encontrada
app.use((req, res)=> res.status(404).send("Endpont no encontrado - 404"))


export default app