function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Erro interno do servidor';

  // Validação (Joi, Sequelize, etc.)
  if (err.name === 'ValidationError') statusCode = 400;

  // Token inválido / expirado
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')
    statusCode = 401;

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
}

module.exports = errorHandler;
