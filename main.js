console.log("JS START");

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("mobile-menu-active");
        });
    }
});

  


  // ===== CART =====
  let count = 0;
  const cartValue = document.querySelector(".cart-value");

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      count++;
      if (cartValue) cartValue.textContent = count;

      btn.textContent = "Added ✓";
      setTimeout(() => btn.textContent = "Add to Cart", 800);
    });
  });


  // ===== SWIPER =====
 

new Swiper(".mySwiper", {
  loop: false,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


/*ADVANCED CART*/

const addButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-value");
const cartList = document.querySelector(".cart-items");
const cartPanel = document.querySelector(".cart-panel");
const cartBtn = document.querySelector(".cart-icon-btn");
const totalItemsText = document.querySelector(".total-items");
const totalPriceText = document.querySelector(".total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || {};

// ---- ADD TO CART ----
addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        if (cart[name]) {
            cart[name].qty++;
        } else {
            cart[name] = { price, qty: 1 };
        }

        saveCart();
        renderCart();
    });
});

// ---- SAVE ----
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ---- RENDER ----
function renderCart() {
    cartList.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    Object.entries(cart).forEach(([name, data]) => {
        totalItems += data.qty;
        totalPrice += data.qty * data.price;

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${name}</strong><br>
                ₹${data.price}
            </div>

            <div class="cart-row-controls">
                <button class="qty-btn minus">−</button>
                <span>${data.qty}</span>
                <button class="qty-btn plus">+</button>
                <button class="remove-btn">x</button>
            </div>
        `;

        // controls
        li.querySelector(".plus").onclick = () => {
            data.qty++;
            saveCart();
            renderCart();
        };

        li.querySelector(".minus").onclick = () => {
            data.qty--;
            if (data.qty <= 0) delete cart[name];
            saveCart();
            renderCart();
        };

        li.querySelector(".remove-btn").onclick = () => {
            delete cart[name];
            saveCart();
            renderCart();
        };

        cartList.appendChild(li);
    });

    cartCount.textContent = totalItems;
    totalItemsText.textContent = totalItems;
    totalPriceText.textContent = totalPrice;
}

// ---- TOGGLE PANEL ----
cartBtn.addEventListener("click", () => {
    cartPanel.classList.toggle("show");
});

// ---- INIT ----
renderCart();
