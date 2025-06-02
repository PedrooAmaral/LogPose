document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('ID_USUARIO')) {
    document.querySelectorAll('.auth-only')
      .forEach(el => el.style.display = 'none');
  }
});
