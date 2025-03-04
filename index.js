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

// Filter products by category
function filterProducts(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Sidebar navigation filtering (exclude WHATSAPP COMMUNITY)
document.querySelectorAll('.sidebar nav a').forEach(link => {
    const text = link.textContent.toLowerCase().replace(' ', '-');
    if (text !== 'whatsapp-community') { // Skip the WhatsApp link
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            const category = text;

            // Remove active class from all links except WHATSAPP COMMUNITY and add to clicked one
            document.querySelectorAll('.sidebar nav a').forEach(a => {
                if (a.textContent.toLowerCase().replace(' ', '-') !== 'whatsapp-community') {
                    a.classList.remove('active');
                }
            });
            link.classList.add('active');

            // Filter products
            filterProducts(category === 'all' ? 'all' : category);
        });
    }
});

// Initial cart count update and show all products
updateCartCount();
filterProducts('all'); // Start with all products visible

// Subscription form
document.querySelector('.subscription')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Subscribed with ${email}!`);
    e.target.reset();
});