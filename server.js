const http = require("http");
const App = require("./src/app");
const Database = require("./src/config/db");
const { initSocket } = require("./src/config/socket");

const appInstance = new App();
const app = appInstance.getApp();

const server = http.createServer(app);

initSocket(server);

Database.connect();

server.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});