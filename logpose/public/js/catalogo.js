document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('fruit-grid');

  try {
    const resposta = await fetch('/api/frutas');
    if (!resposta.ok) throw new Error('Falha ao carregar frutas');
    const frutas = await resposta.json();

    frutas.forEach(fruta => {
      const card = document.createElement('div');
      card.classList.add('fruit-card');

      card.innerHTML = `
        <img src="${fruta.imagemUrl || 'assets/img/placeholder.png'}" alt="${fruta.nome}" class="fruit-img" />
        <h3 class="fruit-nome">${fruta.nome}</h3>
        <p class="fruit-tipo"><strong>Tipo:</strong> ${fruta.tipo}</p>
        <p class="fruit-descricao">${fruta.descricao}</p>
      `;

      grid.appendChild(card);
    });

  } catch (erro) {
    grid.innerHTML = `<p class="erro-carregar">Não foi possível carregar o catálogo. Tente novamente mais tarde.</p>`;
    console.error(erro);
  }
});
