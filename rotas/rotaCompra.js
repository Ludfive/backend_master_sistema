import { Router } from "express";
import CompraCtrl from "../controle/compraCtrl.js";


const rotaCompra = new Router();
const controle = new CompraCtrl();

rotaCompra.post("/", controle.post);
rotaCompra.put("/:id", controle.put);
rotaCompra.delete("/:id", controle.delete);
rotaCompra.get("/", controle.get);
rotaCompra.get("/:id", controle.get);

export default rotaCompra;