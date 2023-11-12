import mongoose, { mongo } from "mongoose";


const userSchema = new mongoose.Schema({ //creamos el esquema de la base de datos para el usuario
    username: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
},{
    timestamps: true
})

export default mongoose.model('User', userSchema); //exportamos el modelo de usuario para usarlo en otros archivos