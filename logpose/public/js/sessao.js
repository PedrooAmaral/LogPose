function validarSessao() {
  const email = sessionStorage.EMAIL_USUARIO;
  const nome = sessionStorage.NOME_USUARIO;
  if (email == null || nome == null) {
    window.location = "../login.html";
    return false;
  }
  return true;
}

function limparSessao() {
  sessionStorage.clear();
  window.location = "login.html";
}

function aguardar() {
  const divAguardar = document.getElementById("div_aguardar");
  if (divAguardar) {
    divAguardar.style.display = "flex";
  }
}

function finalizarAguardar(texto) {
  const divAguardar = document.getElementById("div_aguardar");
  if (divAguardar) {
    divAguardar.style.display = "none";
  }
  if (texto) {
    const divErrosLogin = document.getElementById("div_erros_login");
    if (divErrosLogin) {
      divErrosLogin.style.display = "flex";
      document.getElementById("mensagem_erro").innerText = texto;
    }
  }
}

function sumirMensagem() {
  const divErro = document.getElementById("div_erros_login");
  if (divErro) {
    divErro.style.display = "none";
  }
}

async function entrar() {
  aguardar();
  const emailVar = document.getElementById("email_input").value.trim();
  const senhaVar = document.getElementById("senha_input").value;
  if (!emailVar || !senhaVar) {
    finalizarAguardar();
    document.getElementById("mensagem_erro").innerText = "Preencha todos os campos";
    const divErro = document.getElementById("div_erros_login");
    if (divErro) divErro.style.display = "flex";
    setTimeout(sumirMensagem, 5000);
    return false;
  }
  try {
    const resposta = await fetch("/usuarios/autenticar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailServer: emailVar, senhaServer: senhaVar })
    });
    if (resposta.ok) {
      const json = await resposta.json();
      sessionStorage.EMAIL_USUARIO = json.email;
      sessionStorage.NOME_USUARIO = json.nome;
      sessionStorage.ID_USUARIO = json.id;
      setTimeout(() => {
        window.location = "./dashboard/dashboard.html";
      }, 1000);
    } else {
      const msg = await resposta.text();
      finalizarAguardar();
      document.getElementById("mensagem_erro").innerText = msg;
      const divErro = document.getElementById("div_erros_login");
      if (divErro) divErro.style.display = "flex";
      setTimeout(sumirMensagem, 5000);
    }
  } catch (erro) {
    finalizarAguardar();
    document.getElementById("mensagem_erro").innerText = "Erro na comunicação com o servidor";
    const divErro = document.getElementById("div_erros_login");
    if (divErro) divErro.style.display = "flex";
    setTimeout(sumirMensagem, 5000);
  }
  return false;
}

async function cadastrar() {
  aguardar();
  const nomeVar = document.getElementById("nome_input").value.trim();
  const emailVar = document.getElementById("email_input").value.trim();
  const senhaVar = document.getElementById("senha_input").value;
  const csenhaVar = document.getElementById("confirmacao_senha_input").value;
  if (!nomeVar || !emailVar || !senhaVar || !csenhaVar) {
    finalizarAguardar();
    document.getElementById("mensagem_erro").innerText = "Preencha todos os campos";
    const divErro = document.getElementById("div_erros_login");
    if (divErro) divErro.style.display = "flex";
    setTimeout(sumirMensagem, 5000);
    return false;
  }
  if (senhaVar !== csenhaVar) {
    finalizarAguardar();
    document.getElementById("mensagem_erro").innerText = "As senhas não coincidem";
    const divErro = document.getElementById("div_erros_login");
    if (divErro) divErro.style.display = "flex";
    setTimeout(sumirMensagem, 5000);
    return false;
  }
  try {
    const resposta = await fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomeServer: nomeVar, emailServer: emailVar, senhaServer: senhaVar })
    });
    if (resposta.ok) {
      setTimeout(() => {
        window.location = "login.html";
      }, 1000);
    } else {
      const msg = await resposta.text();
      finalizarAguardar();
      document.getElementById("mensagem_erro").innerText = msg;
      const divErro = document.getElementById("div_erros_login");
      if (divErro) divErro.style.display = "flex";
      setTimeout(sumirMensagem, 5000);
    }
  } catch (erro) {
    finalizarAguardar();
    document.getElementById("mensagem_erro").innerText = "Erro na comunicação com o servidor";
    const divErro = document.getElementById("div_erros_login");
    if (divErro) divErro.style.display = "flex";
    setTimeout(sumirMensagem, 5000);
  }
  return false;
}
