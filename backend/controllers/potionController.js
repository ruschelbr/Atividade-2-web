import Potion from "../models/Potion.js";

async function findAll(request, response) {
  try {
    const potions = await Potion.findAll({ order: [["id", "ASC"]] });
    response.status(200).json(potions);
  } catch (error) {
    console.error("Erro ao listar poções:", error);
    response.status(500).json({ error: "Não foi possível listar as poções." });
  }
}

async function findById(request, response) {
  try {
    const potion = await Potion.findByPk(request.params.id);
    if (!potion) {
      return response.status(404).json({ error: "Poção não encontrada." });
    }
    response.status(200).json(potion);
  } catch (error) {
    console.error("Erro ao buscar poção:", error);
    response.status(500).json({ error: "Não foi possível buscar a poção." });
  }
}

async function create(request, response) {
  try {
    const { name, description, image, price } = request.body;

    if (!name || !description || !image || price === undefined || price === "") {
      return response.status(400).json({
        error: "Preencha nome, descrição, imagem e preço para cadastrar a poção.",
      });
    }

    const potion = await Potion.create({
      name,
      description,
      image,
      price: Number(price),
    });

    response.status(201).json(potion);
  } catch (error) {
    console.error("Erro ao cadastrar poção:", error);
    response.status(400).json({ error: "Não foi possível cadastrar a poção." });
  }
}

async function deleteById(request, response) {
  try {
    const linhasRemovidas = await Potion.destroy({
      where: { id: request.params.id },
    });

    if (linhasRemovidas === 0) {
      return response.status(404).json({ error: "Poção não encontrada." });
    }

    response.status(204).send();
  } catch (error) {
    console.error("Erro ao remover poção:", error);
    response.status(500).json({ error: "Não foi possível remover a poção." });
  }
}

export default { findAll, findById, create, deleteById };
