import { Router } from "express";
import VendaCtrl from "../controle/vendaCtrl.js";


const rotaVenda = new Router();
const controle = new VendaCtrl();

rotaVenda.post("/", controle.post);
rotaVenda.put("/:id", controle.put);
rotaVenda.delete("/:id", controle.delete);
rotaVenda.get("/", controle.get);
rotaVenda.get("/:id", controle.get);

export default rotaVenda;