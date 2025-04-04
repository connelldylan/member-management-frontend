const BACKEND_URL = "https://member-management-backend.onrender.com";

document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    try {
        const res = await fetch(`${BACKEND_URL}/users/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('adminToken', data.token);
            window.location.href = 'admin-home.html';
        } else {
            alert(`Error: ${data.message || "Admin login failed"}`);
        }
    } catch (error) {
        alert("Something went wrong. Please try again.");
    }
});