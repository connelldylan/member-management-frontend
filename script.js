const BACKEND_URL = "https://member-management-backend.onrender.com";

// Handle Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const memberData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            address: document.getElementById('address').value || null,
            birthdate: document.getElementById('birthdate').value || null,
            joindate: document.getElementById('joindate').value || null,
            waiverstatus: document.getElementById('waiverstatus').checked,
            beltlevel: document.getElementById('beltlevel').value || null,
            referredBy: document.getElementById('referredBy').value || null,
            pid: document.getElementById('pid').value,
            discount: document.getElementById('discount').value || 0
        };

        try {
            const res = await fetch(`${BACKEND_URL}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memberData)
            });
            const data = await res.json();
            if (res.ok) {
                alert('Signup successful! Please log in.');
                window.location.href = 'member-login.html';
            } else {
                alert(`Error: ${data.error || 'Signup failed'}`);
            }
        } catch (error) {
            alert('Something went wrong. Please try again.');
        }
    });
}

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
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
                alert('Login successful!');
                // Redirect to a member dashboard if you create one, or stay here for now
            } else {
                alert(`Error: ${data.message || 'Login failed'}`);
            }
        } catch (error) {
            alert('Something went wrong. Please try again.');
        }
    });
}

