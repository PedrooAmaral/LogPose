document.addEventListener('DOMContentLoaded', async () => {
  if (!sessionStorage.getItem('ID_USUARIO')) {
    return window.location = 'login.html';
  }

  const res = await fetch('/api/quiz/general');
  const { quizzes, avgCorrect } = await res.json();
  const ctx = document.getElementById('statsChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: quizzes,
      datasets: [{
        label: 'Média de acertos (%)',
        data: avgCorrect
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
});
