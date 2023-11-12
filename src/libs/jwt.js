import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";


export function createAccessToken(payload){ //funcion para crear el token de acceso
    return new Promise((resolve, reject) => { 
        jwt.sign( //creamos el token
            payload,
            TOKEN_SECRET, 
            {
                expiresIn: "1d" //expira en 1 dia
            },
            (err, token) => { //callback
                if(err) reject(err); 
                resolve(token);
            }
        );
    });
}