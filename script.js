let lojasParceiras = [
  {
    id: 1,
    lojas: "Loja Central",
    email: "central@lojas.com",
    telefone: "(11) 99999-0001"
  },
  {
    id: 2,
    lojas: "Loja Norte",
    email: "norte@lojas.com",
    telefone: "(11) 99999-0002"
  },
  {
    id: 3,
    lojas: "Mundo Das Lingeries",
    email: "mundodaslingeries@gmail.com",
    telefone:"(85) 93200-0000"
  },
  {
    id: 4,
    lojas: "Loja Central Modas",
    email: "contato@centralmodas.com.br",
    telefone: "(85) 93101-9000"
  },
  {
  id: 5,
  lojas: "Tech Store",
  email: "suporte@techstore.com",
  telefone: "(85) 93101-2000"
  }
]

function getProximoId(){
  if(lojasParceiras.length === 0) return 1;
  let maiorId = Math.max(...lojasParceiras.map(l => l.id));
  return maiorId + 1;
}

function salvar() {
  let lojas = document.getElementById("lojas").value.trim()
  let email = document.getElementById("email").value.trim()
  let telefone = document.getElementById("telefone").value.trim()

  let id = getProximoId()

  let lojaParceira = {
  "id": id,
  "lojas": lojas,
  "email": email,
  "telefone": telefone
}

  lojasParceiras.push(lojaParceira) // adiciona uma nova loja parceira

  alert("Cadastrado com sucesso!")

  limparform()
  focarCaixaLojas()

  listar()
}

window.onload = listar;

function limparform(){
  document.getElementById("lojas").value = ""
  document.getElementById("email").value = ""
  document.getElementById("telefone").value = ""

}

function focarCaixaLojas() {
  document.getElementById("lojas").focus()
}

function listar(){
  console.log("lista de lojasParceiras")

  let tbody = document.getElementById("tbody-lojas")
  tbody.innerHTML = ""

  for(let contador = 0; contador <= lojasParceiras.length - 1; contador++){
    let lojaParceira = lojasParceiras[contador]

    console.log(contador, lojaParceira)

    let linha = document.createElement("tr")

    linha.innerHTML = `<tr>
        <td>${lojaParceira.lojas}</td>
        <td>${lojaParceira.email}</td>
        <td>${lojaParceira.telefone}</td>
        <td>
          <button onclick="abrirModal(${contador})">Alterar</button>
          <button onclick="excluir(${lojaParceira.id})">Excluir</button>
        </td>
      </tr>`
    tbody.appendChild(linha)
  }
}

function excluir(idProcurado){
  for(let contador = 0; contador <= lojasParceiras.length - 1; contador++){
    let lojaParceira = lojasParceiras[contador]
    if(lojaParceira.id == idProcurado){
      lojasParceiras.splice(contador, 1) // Remove um elemento da posição contador no vetor
      listar()
      break
    }
  }
}

function abrirModal(index) {
  const loja = lojasParceiras[index];
  document.getElementById("indexEditar").value = index;
  document.getElementById("editar-loja").value = loja.lojas;
  document.getElementById("editar-email").value = loja.email;
  document.getElementById("editar-telefone").value = loja.telefone;

  document.getElementById("modal-editar").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal-editar").style.display = "none";
}

function salvarEdicao() {
  const index = parseInt(document.getElementById("indexEditar").value);
  lojasParceiras[index].lojas = document.getElementById("editar-loja").value.trim();
  lojasParceiras[index].email = document.getElementById("editar-email").value.trim();
  lojasParceiras[index].telefone = document.getElementById("editar-telefone").value.trim();

  fecharModal();
  listar();
}