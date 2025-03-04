// Cart storage with localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = cart.length;
}

// DOM Elements
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const shippingMessage = document.getElementById('shipping-message');
const progressFill = document.getElementById('progress-fill');

// Render Cart
function renderCart() {
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '€0.00';
        checkoutBtn.disabled = true;
        shippingMessage.textContent = 'You’re only €130,00 away from free shipping';
        progressFill.style.width = '0%';
    } else {
        cart.forEach((item, index) => {
            const unitPrice = parseFloat(item.price.slice(1));
            const totalPrice = (unitPrice * item.quantity).toFixed(2);
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <p>${item.name}</p>
                    <p>Unit Price: ${item.price}</p>
                    <p>Size: ${item.size}</p>
                    <div class="quantity-selector">
                        <button class="decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                    <p>Total: €${totalPrice}</p>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });

        const total = cart.reduce((sum, item) => sum + parseFloat(item.price.slice(1)) * item.quantity, 0).toFixed(2);
        cartTotal.textContent = `€${total}`;
        checkoutBtn.disabled = false;

        // Shipping progress
        const remaining = Math.max(130 - parseFloat(total), 0).toFixed(2);
        shippingMessage.textContent = remaining > 0 ? `You’re only €${remaining} away from free shipping` : 'You qualify for free shipping!';
        const progress = (parseFloat(total) / 130) * 100;
        progressFill.style.width = `${Math.min(progress, 100)}%`;

        // Quantity controls
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart[index].quantity++;
                saveCart();
                updateCartCount(); // Update count after increasing quantity
                renderCart();
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                saveCart();
                updateCartCount(); // Update count after decreasing quantity or removing
                renderCart();
            });
        });

        // Remove functionality
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart.splice(index, 1);
                saveCart();
                updateCartCount(); // Update count after removing item
                renderCart();
            });
        });
    }
}

// Initial render
updateCartCount();
renderCart();

// Checkout simulation
checkoutBtn.addEventListener('click', () => {
    const cartSummary = cart.map(item => `${item.name} (Size: ${item.size}, Qty: ${item.quantity}) - €${(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}`).join('\n');
    alert(`Checkout:\n${cartSummary}\nTotal: ${cartTotal.textContent}\n\nProcessing payment...`);
    cart = [];
    saveCart();
    updateCartCount(); // Update count after checkout
    renderCart();
});

// Subscription form
document.querySelector('.subscription')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Subscribed with ${email}!`);
    e.target.reset();
});