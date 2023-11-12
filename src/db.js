import mongoose from "mongoose";


export const connectDB = async () => { //funcion para conectar la base de datos
    try {
        await mongoose.connect("mongodb://127.0.0.1/merndb") //conectamos la base de datos con mongoose
        console.log(">>> DB is connected"); //si se conecta mostramos un mensaje
    } catch (error) {
        console.log(error) //si no se conecta mostramos el error
    }
};