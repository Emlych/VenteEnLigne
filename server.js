const http = require("http"); //importe package http de node
const app = require("./app");

//Fonction qui renvoie un port valide qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || 3000);
app.set("port", port); //dire à l'app sur quel port tourner

//Fonction qui recherche les erreurs et les gère de manière appropriée.
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address == "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + "requires elevated privileges. ");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + "is already in use. ");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler); // enregistre la fonction errorHandler dans le serveurr

//Enregistre un écouteur d'évènements
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port); //server écoute les requêtes envoyées du port
