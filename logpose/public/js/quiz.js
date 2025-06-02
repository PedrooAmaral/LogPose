document.addEventListener('DOMContentLoaded', async () => {
  if (!sessionStorage.getItem('ID_USUARIO')) {
    return window.location = 'login.html';
  }

  const res = await fetch('/api/quiz/questions');
  const questions = await res.json();
  let current = 0, score = 0;
  const container = document.getElementById('quiz-container');

  function showQuestion() {
    const q = questions[current];
    container.innerHTML = `
      <p>${q.question}</p>
      ${q.options.map((opt, i) => `<button onclick="selectOption(${i})">${opt}</button>`).join('')}
    `;
  }

  window.selectOption = async (i) => {
    if (i === questions[current].answer_index) score++;
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      container.innerHTML = `<h3>Você acertou ${score}/${questions.length}</h3>`;
      await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: sessionStorage.getItem('ID_USUARIO'),
          score,
          total: questions.length
        })
      });
    }
  };

  showQuestion();
});
