function aguardar() {}
function finalizarAguardar() {}
function sumirMensagem() {
  const msg = document.getElementById('mensagem_erro');
  if (msg) msg.parentElement.style.display = 'none';
}

async function entrar() {
  aguardar();
  const email = document.getElementById('email_input').value.trim();
  const senha = document.getElementById('senha_input').value.trim();
  if (!email || !senha) {
    document.getElementById('mensagem_erro').innerText = 'Preencha todos os campos';
    document.getElementById('mensagem_erro').parentElement.style.display = 'block';
    finalizarAguardar();
    setTimeout(sumirMensagem, 5000);
    return false;
  }
  try {
    const res = await fetch('/api/usuarios/autenticar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailServer: email, senhaServer: senha })
    });
    if (!res.ok) {
      const txt = await res.text();
      throw txt || 'Erro no login';
    }
    const j = await res.json();
    sessionStorage.setItem('EMAIL_USUARIO', j.email);
    sessionStorage.setItem('NOME_USUARIO', j.nome);
    sessionStorage.setItem('ID_USUARIO', j.id);
    setTimeout(() => window.location = 'dashboard.html', 500);
  } catch (err) {
    document.getElementById('mensagem_erro').innerText = err;
    document.getElementById('mensagem_erro').parentElement.style.display = 'block';
    finalizarAguardar();
    setTimeout(sumirMensagem, 5000);
  }
  return false;
}

async function cadastrar() {
  aguardar();
  const nome = document.getElementById('nome_input').value.trim();
  const email = document.getElementById('email_input').value.trim();
  const senha = document.getElementById('senha_input').value;
  const csenha = document.getElementById('confirmacao_senha_input').value;
  if (!nome || !email || !senha || !csenha) {
    document.getElementById('mensagem_erro').innerText = 'Preencha todos os campos';
    document.getElementById('mensagem_erro').parentElement.style.display = 'block';
    finalizarAguardar();
    setTimeout(sumirMensagem, 5000);
    return false;
  }
  if (senha !== csenha) {
    document.getElementById('mensagem_erro').innerText = 'Senhas não coincidem';
    document.getElementById('mensagem_erro').parentElement.style.display = 'block';
    finalizarAguardar();
    setTimeout(sumirMensagem, 5000);
    return false;
  }
  try {
    const res = await fetch('/api/usuarios/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomeServer: nome, emailServer: email, senhaServer: senha })
    });
    if (!res.ok) throw await res.text();
    window.location = 'login.html';
  } catch (err) {
    document.getElementById('mensagem_erro').innerText = err;
    document.getElementById('mensagem_erro').parentElement.style.display = 'block';
    finalizarAguardar();
    setTimeout(sumirMensagem, 5000);
  }
  return false;
}
