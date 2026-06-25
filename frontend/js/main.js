const elementoEstado = document.getElementById("estado-catalogo");
const elementoGrade = document.getElementById("grade-pocoes");

function criarCardPocao(pocao) {
  const card = document.createElement("article");
  card.className = "potion-card";

  const imagem = document.createElement("img");
  imagem.src = pocao.image;
  imagem.alt = pocao.name;
  imagem.loading = "lazy";
  imagem.onerror = function () {
    this.onerror = null;
    this.src =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#16231b"/></svg>'
      );
  };

  const corpo = document.createElement("div");
  corpo.className = "potion-card-body";

  const nome = document.createElement("h3");
  nome.className = "potion-name";
  nome.textContent = pocao.name;

  const descricao = document.createElement("p");
  descricao.className = "potion-desc";
  descricao.textContent = pocao.description;

  const rodape = document.createElement("div");
  rodape.className = "potion-card-footer";

  const preco = document.createElement("span");
  preco.className = "potion-price";
  preco.textContent = `${pocao.price} moedas`;

  const botaoComprar = document.createElement("button");
  botaoComprar.type = "button";
  botaoComprar.className = "botao botao--comprar";
  botaoComprar.textContent = "Comprar";
  botaoComprar.addEventListener("click", () => {
    botaoComprar.textContent = "Em breve!";
    setTimeout(() => (botaoComprar.textContent = "Comprar"), 1400);
  });

  rodape.append(preco, botaoComprar);
  corpo.append(nome, descricao, rodape);
  card.append(imagem, corpo);

  return card;
}

async function carregarCatalogo() {
  try {
    const pocoes = await PotionsAPI.listar();

    if (pocoes.length === 0) {
      elementoEstado.textContent = "Nenhuma poção cadastrada por aqui ainda.";
      return;
    }

    elementoEstado.remove();
    pocoes.forEach((pocao) => elementoGrade.appendChild(criarCardPocao(pocao)));
  } catch (erro) {
    console.error(erro);
    elementoEstado.textContent =
      "Não foi possível carregar o catálogo agora. Verifique se o Web Service (backend) está rodando em http://localhost:3000.";
    elementoEstado.classList.add("estado-catalogo--erro");
  }
}

document.addEventListener("DOMContentLoaded", carregarCatalogo);
