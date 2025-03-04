// Simulación básica de almacenamiento de usuarios (en localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [];

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Sign Up Form
document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (users.find(user => user.email === email)) {
        alert('Email already registered!');
        return;
    }

    users.push({ email, username, password });
    saveUsers();
    alert('Account created successfully! Please login.');
    window.location.href = 'login.html';
});

// Login Form
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        alert(`Welcome back, ${user.username}!`);
        window.location.href = 'index.html?category=all';
    } else {
        alert('Invalid email or password!');
    }
});