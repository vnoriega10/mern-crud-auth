import Task from "../models/task.model.js"


export const getTasks = async (req, res) => { //funcion para obtener todas las tareas
    const tasks = await Task.find({user: req.user.id}).populate('user');
    res.json(tasks);
}

export const createTask = async (req, res) => { //funcion para crear una tarea
    const { title, description, date } = req.body;

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    })

    const savedTask = await newTask.save();
    res.json(savedTask);
}

export const deleteTask = async (req, res) => { //funcion para eliminar una tarea
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" })
    return res.sendStatus(204);

}

export const updateTask = async (req, res) => { //funcion para actualizar una tarea
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" })
    return res.json(task);
}

export const getTask = async (req, res) => { //funcion para obtener una sola tarea
    const task = await Task.findById(req.params.id).populate('user');
    if (!task) return res.status(404).json({ message: "Task not found" })
    return res.json(task);
}