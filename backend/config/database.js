import { Sequelize } from "sequelize";

// Conforme exigido na atividade, o banco roda em SQLite no modo "memória":
// os dados existem apenas enquanto o servidor estiver no ar e são recriados
// (a partir do seed) a cada vez que o backend é iniciado.
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

export default sequelize;
