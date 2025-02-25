// Store the elements needed in variables
const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");
const navMenu = document.getElementById("nav-menu");
const backToTop = document.getElementById("back-to-top");
// Opens dropdown menu by clicking open button
menuOpen.addEventListener("click", (e) => {
    e.preventDefault();
    navMenu.style.display = "block";
    menuOpen.style.display = "none";
    menuClose.style.display = "block";
});
// Closes dropdown menu by clicking close buton
menuClose.addEventListener("click", (e) => {
    e.preventDefault();
    navMenu.style.display = "none";
    menuOpen.style.display = "block";
    menuClose.style.display = "none";
});
// Closes dropdown menu by clicking outside of menu
document.body.addEventListener("click", (e) => {
    if (!menuOpen.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.style.display = "none";
        menuOpen.style.display = "block";
        menuClose.style.display = "none";
    };   
});
// Makes back to top button visible when you start scrolling
window.addEventListener("scroll", (e) => {
    e.preventDefault();
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    };
});
// Takes use back to top when they click back to top button
backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: "smooth"});
});