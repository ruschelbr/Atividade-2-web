import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import Potion from "./models/Potion.js";
import potionRoutes from "./routes/potionRoutes.js";
import requestLogger from "./middlewares/requestLogger.js";
import initialPotions from "./database/seedPotions.js";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api", potionRoutes);

app.get("/", (request, response) => {
  response.send("Web Service da loja Poções & Soluções está rodando.");
});

async function start() {
  try {
    await sequelize.sync();
    await Potion.bulkCreate(initialPotions);
    console.log(`Banco em memória sincronizado com ${initialPotions.length} poções iniciais.`);

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

start();
