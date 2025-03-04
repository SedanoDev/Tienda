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

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        if (!button.disabled) {
            const product = e.target.closest('.product');
            const name = product.querySelector('.product-info p').textContent;
            const price = product.querySelector('.product-info span').textContent;
            const size = product.querySelector('.size-selector').value;
            const id = product.getAttribute('data-id');
            const image = product.querySelector('.product-image').src;

            cart.push({ id, name, price, size, quantity: 1, image });
            saveCart();
            updateCartCount();
            alert(`${name} (Size: ${size}) added to cart!`);
        }
    });
});

// Image switch on hover
document.querySelectorAll('.product').forEach(product => {
    const img = product.querySelector('.product-image');
    const frontSrc = img.src;
    const backSrc = img.getAttribute('data-back');

    product.addEventListener('mouseenter', () => {
        if (!product.classList.contains('sold-out')) {
            img.src = backSrc;
        }
    });

    product.addEventListener('mouseleave', () => {
        img.src = frontSrc;
    });
});

// Initial cart count update
updateCartCount();

// Subscription form
document.querySelector('.subscription')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Subscribed with ${email}!`);
    e.target.reset();
});