import { Router } from "express";
import ProdutoCtrl from "../controle/produtoCtrl.js";

const rotaProduto = new Router();
const controle = new ProdutoCtrl();

rotaProduto.post("/", controle.post);
rotaProduto.put("/:id", controle.put);
rotaProduto.delete("/:id", controle.delete);
rotaProduto.get("/", controle.get);
rotaProduto.get("/:id", controle.get);

export default rotaProduto;
