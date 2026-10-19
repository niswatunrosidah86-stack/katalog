
/* =========================
   KOPINESIA - JAVASCRIPT
   ========================= */

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-button");
const categories = document.querySelectorAll(".coffee-category");
const productCards = document.querySelectorAll(".product-card");
const emptyState = document.getElementById("emptyState");

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

let activeCategory = "semua";

/* PENCARIAN DAN FILTER */

function filterProducts() {
    const keyword = searchInput.value.trim().toLowerCase();
    let totalVisible = 0;

    categories.forEach((category) => {
        const categoryName = category.dataset.category;
        let visibleCount = 0;

        const cards = category.querySelectorAll(".product-card");

        cards.forEach((card) => {
            const name = card.dataset.name || "";
            const description = card.innerText.toLowerCase();

            const matchesCategory =
                activeCategory === "semua" ||
                activeCategory === categoryName;

            const matchesSearch =
                name.toLowerCase().includes(keyword) ||
                description.includes(keyword);

            const show =
                matchesCategory && matchesSearch;

            card.hidden = !show;

            if (show) {
                visibleCount++;
                totalVisible++;
            }
        });

        category.hidden = visibleCount === 0;
    });

    emptyState.hidden = totalVisible !== 0;
}

/* TOMBOL FILTER */

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.toggle(
                "active",
                item === button
            );
        });

        filterProducts();
    });
});

/* INPUT PENCARIAN */

searchInput.addEventListener("input", filterProducts);

/* MODE TERANG DAN GELAP */

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const darkMode =
        document.body.classList.contains("dark-mode");

    themeToggle.textContent = darkMode ? "☾" : "☼";

    themeToggle.setAttribute(
        "aria-label",
        darkMode ? "Aktifkan tema terang" : "Aktifkan tema gelap"
    );
});

/* MENU NAVIGASI HP */

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
});

/* TUTUP MENU SETELAH LINK DIKLIK */

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

/* DETAIL PRODUK */

/* FOTO DIKLIK UNTUK MENAMPILKAN DESKRIPSI */

productCards.forEach((card) => {
    const image = card.querySelector("img");
    const detailButton = card.querySelector(".detail-button");

    function toggleDescription() {
        const isOpen = card.classList.toggle("show-description");

        // Ubah tulisan tombol sesuai kondisi
        detailButton.textContent = isOpen
            ? "Tutup deskripsi ↑"
            : "Lihat detail ↗";

        // Beri tahu pembaca layar tentang status foto
        image.setAttribute("aria-expanded", String(isOpen));
    }

    image.setAttribute("role", "button");
    image.setAttribute("tabindex", "0");
    image.setAttribute("aria-expanded", "false");
    image.setAttribute(
        "aria-label",
        "Klik untuk melihat deskripsi " +
        card.querySelector("h3").textContent
    );

    image.addEventListener("click", toggleDescription);

    // Bisa dibuka menggunakan tombol Enter atau Spasi
    image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleDescription();
        }
    });

    detailButton.addEventListener("click", toggleDescription);
});
