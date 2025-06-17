class ErrorHandler {
  static handle(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

module.exports = ErrorHandler;