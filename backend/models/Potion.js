import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Model "Potion": representa cada poção cadastrada na loja.
// Campos pedidos na atividade: nome, descrição, imagem e preço.
class Potion extends Model {}

Potion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "O nome da poção é obrigatório." } },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: { msg: "A descrição da poção é obrigatória." } },
    },
    // Guardamos apenas a URL/caminho da imagem, como permitido no enunciado.
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "A imagem (URL) da poção é obrigatória." } },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: "O preço deve ser um número." },
        min: { args: [0], msg: "O preço não pode ser negativo." },
      },
    },
  },
  {
    sequelize,
    modelName: "Potion",
    tableName: "potions",
    timestamps: false,
  }
);

export default Potion;
