const priceAll = document.querySelectorAll('.price');

priceAll.forEach((element) => {
    element.innerHTML = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(element.innerHTML)
})