const jwt = require('jsonwebtoken');
const AppError = require("../utils/appError");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return next(new AppError('Acesso negado.', 401));

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return next(new AppError('Token inválido ou expirado.', 401));
    }
}

const authorizedRoles =  (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next(new AppError('Você não está autorizado.', 403));
        }
        next();
    }
}

module.exports = {verifyToken, authorizedRoles};

