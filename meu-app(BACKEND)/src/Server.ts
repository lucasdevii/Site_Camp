import { App } from "./App";
import "./routes/users";
import "./routes/chat";
import "./routes/friends";
import "./sockets/sockets_routes";
//    TYPES  |
//           V
const PORT = 4001;

// Inicialização do servidor
App.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
