const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

//Proteger rotas
exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headrs.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new ErrorResponse('Não autorizado a acessar esta rota', 401));
    } try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByid(decoded.id);

        next();
    } catch (err) {
        return next(new ErrorResponse('Não autorizado a acessar esta rota', 401));
    }
};

// Autorizar acesso por role
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `usuário com role ${req.user.role} não está autorizado a acessar esta rota`,
                    403
                )
            );
        }
        next();
    };
};