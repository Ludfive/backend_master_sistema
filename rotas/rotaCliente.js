import { Router } from "express";
import ClienteCtrl from "../controle/clienteCtrl.js";

const rotaCliente = new Router();
const controle = new ClienteCtrl();

rotaCliente.post("/", controle.post);
rotaCliente.put("/:id", controle.put);
rotaCliente.delete("/:id", controle.delete);
rotaCliente.get("/", controle.get);
rotaCliente.get("/:id", controle.get);

export default rotaCliente;
