document.addEventListener("DOMContentLoaded", function() {

    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const desktopNav = document.querySelector(".desktop-nav");
    
    mobileMenuBtn.addEventListener("click", function() {
        desktopNav.classList.toggle("show");
    });
    
});