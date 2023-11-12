import app from "./app.js"
import { connectDB } from "./db.js"


connectDB(); // llamamos a la funcion para conectar la base de datos
app.listen(4000) //iniciamos el servidor en el puerto 4000
console.log("Server on port", 4000)