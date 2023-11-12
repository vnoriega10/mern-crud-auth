import express from "express"; 
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express() //creamos un objeto app para manejar el servidor


app.use(morgan("dev")); //para ver las peticiones que llegan al servidor
app.use(cookieParser()); //para convertir y manejar las cookies

app.use(express.json()); //para que el servidor entienda los datos que llegan en formato json

app.use('/api',authRoutes); //para manejar las rutas de autenticacion

export default app; 
