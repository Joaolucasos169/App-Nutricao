const Server = require('./server');

let serverApp;

module.exports = async (req, res) => {
  if (!serverApp) {
    const server = new Server();
    await server.initDb();
    serverApp = server.app;
  }
  return serverApp(req, res);
};
