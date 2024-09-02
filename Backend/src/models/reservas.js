import mongoose, { Schema, model } from "mongoose";



const ReservasSchema = new Schema({
    codigo: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    cliente: {
        type: mongoose.Schema.Types.String,
        ref: "Clientes",
        required: true
    },
    vehiculo: [{
        type: mongoose.Schema.Types.String,
        ref: "Vehiculos",
        require: true
    }]

}, {
    timestamps: true
})


export default model("Reservas", ReservasSchema)