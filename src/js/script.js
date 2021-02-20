const showMenu = () => {
  const btn = document.querySelector('.header__nav-btn');
  const menu = document.querySelector('.header__nav-list');

  btn.addEventListener('click', () => menu.classList.toggle('show-right'));
}

showMenu();