const formulario = document.getElementById("form-pocao");
const mensagemForm = document.getElementById("mensagem-form");
const elementoEstado = document.getElementById("estado-admin");
const listaPocoes = document.getElementById("lista-pocoes");

function mostrarMensagemForm(texto, tipo) {
  mensagemForm.textContent = texto;
  mensagemForm.classList.remove("mensagem-form--sucesso", "mensagem-form--erro");
  if (tipo) {
    mensagemForm.classList.add(`mensagem-form--${tipo}`);
  }
}

function criarLinhaPocao(pocao) {
  const linha = document.createElement("div");
  linha.className = "admin-potion-row";
  linha.dataset.id = pocao.id;

  const imagem = document.createElement("img");
  imagem.src = pocao.image;
  imagem.alt = pocao.name;
  imagem.onerror = function () {
    this.onerror = null;
    this.src =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><rect width="100%" height="100%" fill="#16231b"/></svg>'
      );
  };

  const info = document.createElement("div");
  info.className = "admin-potion-info";

  const nome = document.createElement("h4");
  nome.textContent = pocao.name;

  const descricao = document.createElement("p");
  descricao.textContent = pocao.description;

  info.append(nome, descricao);

  const preco = document.createElement("span");
  preco.className = "admin-potion-price";
  preco.textContent = `${pocao.price} moedas`;

  const botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.className = "botao botao--remover";
  botaoRemover.textContent = "Remover";
  botaoRemover.addEventListener("click", () => removerPocao(pocao.id, linha, botaoRemover));

  linha.append(imagem, info, preco, botaoRemover);
  return linha;
}

async function carregarPocoes() {
  try {
    const pocoes = await PotionsAPI.listar();
    listaPocoes.innerHTML = "";

    if (pocoes.length === 0) {
      elementoEstado.textContent = "Nenhuma poção cadastrada ainda. Cadastre a primeira acima!";
      elementoEstado.classList.remove("estado-catalogo--erro");
      return;
    }

    elementoEstado.textContent = "";
    pocoes.forEach((pocao) => listaPocoes.appendChild(criarLinhaPocao(pocao)));
  } catch (erro) {
    console.error(erro);
    elementoEstado.textContent =
      "Não foi possível carregar as poções cadastradas. Verifique se o backend está rodando em http://localhost:3000.";
    elementoEstado.classList.add("estado-catalogo--erro");
  }
}

async function removerPocao(id, linha, botao) {
  const confirmou = window.confirm("Tem certeza que deseja remover esta poção?");
  if (!confirmou) return;

  botao.disabled = true;
  botao.textContent = "Removendo…";

  try {
    await PotionsAPI.remover(id);
    linha.remove();

    if (listaPocoes.children.length === 0) {
      elementoEstado.textContent = "Nenhuma poção cadastrada ainda. Cadastre a primeira acima!";
    }
  } catch (erro) {
    console.error(erro);
    botao.disabled = false;
    botao.textContent = "Remover";
    alert(erro.message || "Não foi possível remover a poção.");
  }
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  mostrarMensagemForm("", null);

  const dados = new FormData(formulario);
  const novaPocao = {
    name: dados.get("name").trim(),
    description: dados.get("description").trim(),
    image: dados.get("image").trim(),
    price: Number(dados.get("price")),
  };

  if (!novaPocao.name || !novaPocao.description || !novaPocao.image || Number.isNaN(novaPocao.price)) {
    mostrarMensagemForm("Preencha todos os campos corretamente antes de cadastrar.", "erro");
    return;
  }

  const botaoSubmit = formulario.querySelector("button[type=submit]");
  botaoSubmit.disabled = true;

  try {
    const pocaoCriada = await PotionsAPI.cadastrar(novaPocao);

    if (elementoEstado.textContent) {
      elementoEstado.textContent = "";
    }
    listaPocoes.appendChild(criarLinhaPocao(pocaoCriada));

    formulario.reset();
    mostrarMensagemForm("Poção cadastrada com sucesso!", "sucesso");
  } catch (erro) {
    console.error(erro);
    mostrarMensagemForm(erro.message || "Não foi possível cadastrar a poção.", "erro");
  } finally {
    botaoSubmit.disabled = false;
  }
});

document.addEventListener("DOMContentLoaded", carregarPocoes);
