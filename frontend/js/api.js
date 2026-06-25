const API_BASE_URL = "http://localhost:3000/api";

const PotionsAPI = {
  async listar() {
    const resposta = await fetch(`${API_BASE_URL}/potions`);
    if (!resposta.ok) {
      throw new Error("Não foi possível carregar as poções.");
    }
    return resposta.json();
  },

  async cadastrar(pocao) {
    const resposta = await fetch(`${API_BASE_URL}/potions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pocao),
    });

    const dados = await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
      throw new Error(dados.error || "Não foi possível cadastrar a poção.");
    }
    return dados;
  },

  async remover(id) {
    const resposta = await fetch(`${API_BASE_URL}/potions/${id}`, {
      method: "DELETE",
    });

    if (!resposta.ok && resposta.status !== 204) {
      const dados = await resposta.json().catch(() => ({}));
      throw new Error(dados.error || "Não foi possível remover a poção.");
    }
  },
};
