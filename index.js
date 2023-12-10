import express from "express";
import cors from "cors";
import rotaCompra from "./rotas/rotaCompra.js";
import rotaVenda from "./rotas/rotaVenda.js";
import rotaCategoria from "./rotas/rotaCategoria.js";
import rotaFornecedor from "./rotas/rotaFornecedor.js";
import rotaProduto from "./rotas/rotaProduto.js";
import rotaCliente from './rotas/rotaCliente.js';

const app = express();

app.use(
  cors({
    origins: "*",
    methods: "GET,HEAD,PATCH,POST,DELETE,PUT",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/categoria", rotaCategoria);
app.use("/fornecedor", rotaFornecedor);
app.use("/produto", rotaProduto);
app.use("/cliente", rotaCliente);
app.use("/compra", rotaCompra );
app.use("/venda", rotaVenda );

app.get("/", (req, res) => {
  res.send("Oiii!");
});

app.listen(4000, () => {
  console.log("API rodando na porta 4000");
});
