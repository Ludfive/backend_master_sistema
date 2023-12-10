import { Router } from "express";
import FornecedorCtrl from "../controle/fornecedorCtrl.js";

const rotaFornecedor = new Router();
const controle = new FornecedorCtrl();

rotaFornecedor.post("/", controle.post);
rotaFornecedor.put("/:documento", controle.put);
rotaFornecedor.delete("/:documento", controle.delete);
rotaFornecedor.get("/", controle.get);
rotaFornecedor.get("/:documento", controle.get);

export default rotaFornecedor;
