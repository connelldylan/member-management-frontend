const BACKEND_URL = "https://member-management-backend.onrender.com";

// Handle Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${BACKEND_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert("Signup successful! You can now log in.");
        } else {
            alert(`Error: ${data.message || "Signup failed"}`);
        }
    } catch (error) {
        console.error("Signup Error:", error);
        alert("Something went wrong. Please try again.");
    }
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${BACKEND_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            alert("Login successful!");
        } else {
            alert(`Error: ${data.message || "Login failed"}`);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Something went wrong. Please try again.");
    }
});

// Optional: Fetch User Info (Example)
async function getUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("You are not logged in!");
        return;
    }

    try {
        const res = await fetch(`${BACKEND_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.ok) {
            alert(`Welcome, ${data.name}! Your email: ${data.email}`);
        } else {
            alert(`Error: ${data.message || "Could not fetch user profile"}`);
        }
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        alert("Something went wrong. Please try again.");
    }
}

