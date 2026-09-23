// ==========================================
// GLOWCARE PRODUCTS
// ==========================================

const products = [
    {
        id: 1,
        name: "Gentle Face Cleanser",
        category: "Cleanser",
        price: 399,
        rating: "4.8",
        image: "image/Gentle Face Cleanser.jfif",
        tag: "Best Seller"
    },

    {
        id: 2,
        name: "Vitamin C Glow Serum",
        category: "Serum",
        price: 699,
        rating: "4.9",
        image: "image/Vitamin C Glow Serum.jfif",
        tag: "Popular"
    },

    {
        id: 3,
        name: "Daily Hydration Cream",
        category: "Moisturizer",
        price: 549,
        rating: "4.7",
        image: "image/Daily Hydration Cream.jfif",
        tag: "New"
    },

    {
        id: 4,
        name: "SPF 50 Sunscreen",
        category: "Sunscreen",
        price: 599,
        rating: "4.9",
        image: "image/SPF 50 Sunscreen.jfif",
        tag: "Best Seller"
    },

    {
        id: 5,
        name: "Foaming Face Wash",
        category: "Cleanser",
        price: 349,
        rating: "4.6",
        image: "image/Foaming Face Washh.jfif",
        tag: ""
    },

    {
        id: 6,
        name: "Hyaluronic Acid Serum",
        category: "Serum",
        price: 799,
        rating: "4.8",
        image: "image/Hyaluronic Acid Serum.jfif",
        tag: "New"
    },

    {
        id: 7,
        name: "Aloe Vera Moisturizer",
        category: "Moisturizer",
        price: 449,
        rating: "4.7",
        image: "image/Aloe Vera Moisturizer.jfif",
        tag: ""
    },

    {
        id: 8,
        name: "Matte Sun Shield SPF 50",
        category: "Sunscreen",
        price: 649,
        rating: "4.8",
        image: "image/Matte Sun Shield SPF 50.jfif",
        tag: "Popular"
    }
];


// ==========================================
// VARIABLES
// ==========================================

let currentFilter = "All";

let cart = JSON.parse(
    localStorage.getItem("glowcareCart")
) || [];


const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");


// ==========================================
// RENDER PRODUCTS
// ==========================================

function renderProducts(list = products) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        productGrid.innerHTML = `
            <p class="no-products">
                No products found.
            </p>
        `;

        return;
    }

    list.forEach(function (product) {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            ${
                product.tag
                    ? `<span class="badge">${product.tag}</span>`
                    : ""
            }

            <div class="product-img">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.style.display='none'"
                >

            </div>


            <div class="product-info">

                <span class="product-tag">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">
                    ★★★★★
                    <span>${product.rating}</span>
                </div>

                <div class="price-row">

                    <span class="price">
                        ₹${product.price}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                        title="Add to cart"
                    >
                        +
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);

    });
}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id) {

    const existing = cart.find(function (item) {
        return item.id === id;
    });

    if (existing) {

        existing.qty++;

    } else {

        const product = products.find(function (item) {
            return item.id === id;
        });

        if (product) {

            cart.push({
                ...product,
                qty: 1
            });

        }
    }

    saveCart();

    openCart();
}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(id) {

    cart = cart.filter(function (item) {
        return item.id !== id;
    });

    saveCart();
}


// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "glowcareCart",
        JSON.stringify(cart)
    );

    renderCart();
}


// ==========================================
// RENDER CART
// ==========================================

function renderCart() {

    const count = cart.reduce(
        function (sum, item) {
            return sum + item.qty;
        },
        0
    );


    const total = cart.reduce(
        function (sum, item) {
            return sum + (item.price * item.qty);
        },
        0
    );


    cartCount.textContent = count;

    cartTotal.textContent = `₹${total}`;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                Your cart is empty 🛍

                <br>

                <small>
                    Add a product to get started.
                </small>

            </div>
        `;

        return;
    }


    cartItems.innerHTML = cart.map(function (item) {

        return `

            <div class="cart-item">

                <div class="cart-item-img">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="cart-item-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <small>
                        ₹${item.price} × ${item.qty}
                    </small>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>


                <strong>
                    ₹${item.price * item.qty}
                </strong>

            </div>

        `;

    }).join("");
}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    document
        .getElementById("cartDrawer")
        .classList.add("open");

    document
        .getElementById("overlay")
        .classList.add("show");
}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    document
        .getElementById("cartDrawer")
        .classList.remove("open");

    document
        .getElementById("overlay")
        .classList.remove("show");
}


// ==========================================
// PRODUCT FILTER
// ==========================================

document
    .querySelectorAll(".filter")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            document
                .querySelectorAll(".filter")
                .forEach(function (btn) {
                    btn.classList.remove("active");
                });


            button.classList.add("active");


            currentFilter = button.dataset.filter;


            if (currentFilter === "All") {

                renderProducts(products);

            } else {

                const filteredProducts = products.filter(
                    function (product) {
                        return product.category === currentFilter;
                    }
                );

                renderProducts(filteredProducts);
            }

        });

    });


// ==========================================
// CATEGORY FILTER
// ==========================================

document
    .querySelectorAll(".category-card")
    .forEach(function (card) {

        card.addEventListener("click", function () {

            const category = card.dataset.category;


            document
                .querySelectorAll(".filter")
                .forEach(function (button) {

                    button.classList.toggle(
                        "active",
                        button.dataset.filter === category
                    );

                });


            currentFilter = category;


            renderProducts(
                products.filter(function (product) {
                    return product.category === category;
                })
            );


            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


// ==========================================
// CART EVENTS
// ==========================================

document
    .getElementById("cartBtn")
    .addEventListener("click", openCart);


document
    .getElementById("closeCart")
    .addEventListener("click", closeCart);


document
    .getElementById("overlay")
    .addEventListener("click", closeCart);


// ==========================================
// MOBILE MENU
// ==========================================

document
    .getElementById("menuBtn")
    .addEventListener("click", function () {

        document
            .getElementById("navMenu")
            .classList.toggle("open");

    });


document
    .querySelectorAll("nav a")
    .forEach(function (link) {

        link.addEventListener("click", function () {

            document
                .getElementById("navMenu")
                .classList.remove("open");

        });

    });


// ==========================================
// SEARCH
// ==========================================

const searchPanel =
    document.getElementById("searchPanel");

const searchInput =
    document.getElementById("searchInput");


document
    .getElementById("searchBtn")
    .addEventListener("click", function () {

        searchPanel.classList.toggle("show");

        if (searchPanel.classList.contains("show")) {
            searchInput.focus();
        }

    });


document
    .getElementById("closeSearch")
    .addEventListener("click", function () {

        searchPanel.classList.remove("show");

        searchInput.value = "";

        renderProducts(products);

    });


// ==========================================
// SEARCH PRODUCTS
// ==========================================

searchInput.addEventListener("input", function (event) {

    const query = event.target.value
        .toLowerCase()
        .trim();


    const filteredProducts = products.filter(
        function (product) {

            return `${product.name} ${product.category}`
                .toLowerCase()
                .includes(query);

        }
    );


    renderProducts(filteredProducts);

});


// ==========================================
// NEWSLETTER
// ==========================================

document
    .getElementById("newsletterForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        alert(
            "Thank you for subscribing to GlowCare!"
        );

        event.target.reset();

    });


// ==========================================
// CHECKOUT
// ==========================================

document
    .getElementById("checkoutBtn")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty.");

        } else {

            alert(
                "Demo checkout - connect this button to your payment/order system."
            );

        }

    });


// ==========================================
// START WEBSITE
// ==========================================

renderProducts();

renderCart();