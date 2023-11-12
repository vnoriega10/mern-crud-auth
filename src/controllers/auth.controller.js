import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js";


export const register = async (req, res) => {
    const { username, email, password} = req.body; //obtenemos los datos del usuario

    
    try {
        const passwordHash = await bcrypt.hash(password, 10); //encriptar contraseña	
        
        const newUser = new User({ //creamos un nuevo usuario
            username,
            email,
            password: passwordHash,
        })
    
        const userSaved = await newUser.save(); //guardamos el usuario en la base de datos
        
        const token = await createAccessToken({id: userSaved._id}) //creamos el token de acceso con el id del usuario
        res.cookie("token", token)
        res.json({ //enviamos el usuario guardado
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        }); 

    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

export const login = async (req, res) => {
    const { email, password} = req.body; //obtenemos los datos del usuario

    
    try {

        const userFound = await User.findOne({email}); //buscamos el usuario por email
        if(!userFound) return res.status(400).json({message: "User not found"});
        
        const isMatch = await bcrypt.compare(password, userFound.password); //comparamos la contraseña ingresada con la contraseña encriptada
        if(!isMatch) return res.status(400).json({message: "Incorrect password"});
        
        const token = await createAccessToken({id: userFound._id}) //creamos el token de acceso con el id del usuario

        res.cookie("token", token)
        res.json({ //enviamos el usuario guardado
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        }); 

    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

export const logout = (req, res) => { //cerrar sesion del usuario
    res.cookie("token", "",{ //eliminamos la cookie
        expires: new Date(0), 
    });

    return res.sendStatus(200);
}

export const profile = async (req, res)=>{
    const userFound = await User.findById(req.user.id) //buscamos el usuario por id

    if(!userFound) return res.status(400).json({message: "User not found"}); //si no existe el usuario enviamos un error 400

    return res.json({ //enviamos los datos del usuario encontrado
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })


    res.send("profile")
}