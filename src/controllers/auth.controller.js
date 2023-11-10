export const register = async (req, res) => {
    const { username, email, password} = req.body;

    
    res.send('registrando');
};

export const login = async (req, res) => res.send('login');