const authRepository = require ('./auth.repository');
const AppError = require("../../utils/appError");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken  = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
    },
         process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
};

const registerUser = async({ nome, email, password }) => {
    const exist = await authRepository.findByEmail(email);
    if(exist) throw new AppError("Email já cadastrado", 409);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authRepository.create({
        nome,
        email,
        password: hashedPassword,
    });

    const token = generateToken(newUser);

    return {
        token,
        user: {id: newUser._id,
        nome: newUser.nome,
        email: newUser.email,
        role: newUser.role,
        }
    };
};

const loginUser = async ({ email, password}) => {
    const user = await authRepository.findByEmail(email);
    if(!user) throw new AppError("Credenciais inválidas.", 401);

    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword) throw new AppError('Credenciais inválidas.', 401);

    const token = generateToken(user);

    return {
        token,
        user: {id: user._id, nome: user.nome, email: user.email, role: user.role}
    };
};

module.exports = {registerUser, loginUser};