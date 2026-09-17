document.addEventListener("DOMContentLoaded", () => {

    const loadingScreen = document.getElementById("loadingScreen");

    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add("hidden");
        }
    }, 900);


    /* TAB NAVIGATION */

    const tabButtons = document.querySelectorAll("[data-tab]");
    const panels = document.querySelectorAll(".tab-panel");

    function openTab(tabName) {

        panels.forEach(panel => {
            panel.classList.remove("active");
        });

        const selectedPanel = document.getElementById(`tab-${tabName}`);

        if (selectedPanel) {
            selectedPanel.classList.add("active");
        }

        document.querySelectorAll(".nav-tab").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.tab === tabName
            );
        });

        document.querySelectorAll(".bottom-nav-item").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.tab === tabName
            );
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    tabButtons.forEach(button => {

        button.addEventListener("click", event => {

            const tab = event.currentTarget.dataset.tab;

            if (tab) {
                openTab(tab);
            }

        });

    });


    /* THEME */

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");

        if (themeToggle) {
            themeToggle.textContent = "☀";
        }
    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const currentTheme =
                document.documentElement.getAttribute("data-theme");

            if (currentTheme === "dark") {

                document.documentElement.removeAttribute("data-theme");

                themeToggle.textContent = "☾";

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );

            } else {

                document.documentElement.setAttribute(
                    "data-theme",
                    "dark"
                );

                themeToggle.textContent = "☀";

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );

            }

        });

    }


    /* CURRENT YEAR */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* CONTACT FORM */

    const contactForm = document.getElementById("contactForm");
    const contactStatus = document.getElementById("contactStatus");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                document.getElementById("contactName").value.trim();

            const email =
                document.getElementById("contactEmail").value.trim();

            const subject =
                document.getElementById("contactSubject").value.trim();

            const message =
                document.getElementById("contactMessage").value.trim();


            if (!name || !email || !subject || !message) {

                contactStatus.textContent =
                    "Please complete all fields.";

                return;
            }


            const mailSubject =
                encodeURIComponent(subject);

            const mailBody =
                encodeURIComponent(
                    `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
                );


            window.location.href =
                `mailto:abdulrehmanrao184@gmail.com?subject=${mailSubject}&body=${mailBody}`;


            contactStatus.textContent =
                "Opening your email application...";

        });

    }


    /* SIMPLE SCROLL REVEAL */

    const cards = document.querySelectorAll(
        ".card, .quick-card, .objective-card, .career-card"
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.08
        }
    );


    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(12px)";
        card.style.transition =
            "opacity .45s ease, transform .45s ease";

        observer.observe(card);

    });


    /* KEYBOARD NAVIGATION */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            openTab("home");
        }

    });

});
