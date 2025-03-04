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
        const isNew = product.querySelector('.new-label') !== null;
        const isSoldOut = product.classList.contains('sold-out');

        if (category === 'all') {
            product.style.display = 'block';
        } else if (category === 'new' && isNew) {
            product.style.display = 'block';
        } else if (category === 'sold-out' && isSoldOut) {
            product.style.display = 'block';
        } else if (productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Sidebar navigation filtering (exclude WHATSAPP COMMUNITY, LOGIN, and SIGN UP)
document.querySelectorAll('.sidebar nav a').forEach(link => {
    const text = link.textContent.toLowerCase().replace(' ', '-');
    
    // Excluir enlaces que no deben ser filtrados
    if (text !== 'whatsapp-community' && text !== 'login' && text !== 'sign-up') {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir comportamiento predeterminado solo para categorías
            const category = text;

            // Remover clase 'active' de todos los enlaces de categoría y añadirla al seleccionado
            document.querySelectorAll('.sidebar nav a').forEach(a => {
                const aText = a.textContent.toLowerCase().replace(' ', '-');
                if (aText !== 'whatsapp-community' && aText !== 'login' && aText !== 'sign-up') {
                    a.classList.remove('active');
                }
            });
            link.classList.add('active');

            // Filtrar productos
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

// Leer el parámetro de categoría de la URL y aplicar el filtro
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all'; // Por defecto, muestra "all"

    // Remover la clase "active" de todos los enlaces y añadirla al seleccionado
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        const linkText = link.textContent.toLowerCase().replace(' ', '-');
        if (linkText === category && linkText !== 'whatsapp-community' && linkText !== 'login' && linkText !== 'sign-up') {
            link.classList.add('active');
        } else if (linkText !== 'whatsapp-community' && linkText !== 'login' && linkText !== 'sign-up') {
            link.classList.remove('active');
        }
    });

    // Aplicar el filtro
    filterProducts(category);
});