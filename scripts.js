document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const menuLinks = document.querySelectorAll(".mobile-menu ul li a");
    const languageButtons = document.querySelectorAll(".language-switcher_mob button");

    // Toggle mobile menu
    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            mobileMenu.classList.remove("active");
        });
    });

    // Language switcher functionality (Prevent reload on mobile)
    languageButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default behavior
            const selectedLanguage = this.getAttribute("data-lang");

            // Save the language selection in localStorage
            localStorage.setItem("selectedLanguage", selectedLanguage);

            // Reload only if NOT in mobile view
            if (window.innerWidth > 768) { 
                location.reload();
            } else {
                console.log("Language switched to:", selectedLanguage);
                document.documentElement.setAttribute("lang", selectedLanguage);
            }
        });
    });

    // Set language on page load
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
        // Apply language-specific changes here
        console.log("Language set to:", savedLanguage);
        document.documentElement.setAttribute("lang", savedLanguage);
    }
	
	const form = document.querySelector("form");
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            showSuccessMessage(); // Show success message
            form.reset(); // Clear form fields
        } else {
            showErrorMessage(); // Show error message if failed
        }
    });

    function showSuccessMessage() {
        alert("✅ Message sent successfully!"); // Replace with a custom popup if needed
    }

    function showErrorMessage() {
        alert("❌ Failed to send message. Please try again.");
    }
});

// Get the mobile menu and the menu links
const mobileMenu = document.querySelector('.mobile-menu');
const closeLinks = document.querySelectorAll('.close-menu');

// Function to close the menu
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
}

// Add event listener to each link with the class 'close-menu'
closeLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Smooth scrolling with Lenis
if (typeof Lenis !== "undefined") {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
} else {
    console.error("Lenis is not defined. Please check your script loading order.");
}

// Open a page when clicking a button
function openPage(page) {
    window.location.href = page;
}

// Responsive Mobile Menu Toggle
function toggleMenu() {
    const menu = document.querySelector('.nav-links');
    menu.classList.toggle('active');
}

function toggleMobileMenu() {
    var menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('active');
}