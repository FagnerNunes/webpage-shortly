const menuHamburguer = document.querySelector(".menu");
menuHamburguer.addEventListener("click", () => {
    const abrirMenu = document.querySelector("nav");
    abrirMenu.classList.toggle("open")
})