import { Router } from "express";
import CategoriaCtrl from "../controle/categoriaCtrl.js";

const rotaCategoria = new Router();
const controle = new CategoriaCtrl();

rotaCategoria.post("/", controle.post);
rotaCategoria.put("/:codigo", controle.put);
rotaCategoria.delete("/:codigo", controle.delete);
rotaCategoria.get("/", controle.get);
rotaCategoria.get("/:cod", controle.get);

export default rotaCategoria;
