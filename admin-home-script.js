const BACKEND_URL = "https://member-management-backend.onrender.com";
const token = localStorage.getItem('adminToken');

async function fetchWithAuth(url, options = {}) {
    if (!token) {
        alert('No admin token found. Please log in again.');
        window.location.href = 'admin-login.html';
        return;
    }
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        if (res.status === 401) {
            alert('Session expired or invalid token. Please log in again.');
            localStorage.removeItem('adminToken');
            window.location.href = 'admin-login.html';
        }
        return data;
    } catch (error) {
        alert('Network error. Please try again.');
        throw error;
    }
}

async function deleteMember() {
    const mid = parseInt(document.getElementById('deleteMid').value);
    if (isNaN(mid) || mid <= 0) {
        alert('Please enter a valid Member ID');
        return;
    }
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/delete-member`, {
        method: 'POST',
        body: JSON.stringify({ mid })
    });
    alert(data.error || data.message);
}

async function updateBelt() {
    const mid = parseInt(document.getElementById('beltMid').value);
    const beltLevel = document.getElementById('beltLevel').value;
    if (isNaN(mid) || mid <= 0) {
        alert('Please enter a valid Member ID');
        return;
    }
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/update-belt`, {
        method: 'POST',
        body: JSON.stringify({ mid, beltLevel })
    });
    alert(data.error || data.message);
}

async function updateAddress() {
    const mid = parseInt(document.getElementById('addressMid').value);
    const address = document.getElementById('address').value;
    if (isNaN(mid) || mid <= 0) {
        alert('Please enter a valid Member ID');
        return;
    }
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/update-address`, {
        method: 'POST',
        body: JSON.stringify({ mid, address })
    });
    alert(data.error || data.message);
}

async function addChild() {
    const parentMid = parseInt(document.getElementById('parentMid').value);
    const childMid = parseInt(document.getElementById('childMid').value);
    if (isNaN(parentMid) || parentMid <= 0 || isNaN(childMid) || childMid <= 0) {
        alert('Please enter valid Member IDs for parent and child');
        return;
    }
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/add-child`, {
        method: 'POST',
        body: JSON.stringify({ parentMid, childMid })
    });
    alert(data.error || data.message);
}

async function incrementClasses() {
    const mid = parseInt(document.getElementById('classesMid').value);
    if (isNaN(mid) || mid <= 0) {
        alert('Please enter a valid Member ID');
        return;
    }
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/increment-classes`, {
        method: 'POST',
        body: JSON.stringify({ mid })
    });
    alert(data.error || data.message);
}

async function getAvgClasses() {
    const beltLevel = document.getElementById('avgBelt').value;
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/avg-classes-by-belt?beltLevel=${beltLevel}`);
    document.getElementById('avgResult').textContent = data.error || `Average: ${data.avgClasses}`;
}

async function getTopClasses() {
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/top-classes`);
    const ul = document.getElementById('topClassesResult');
    ul.innerHTML = data.error || data.topMembers.map(m => `<li>${m.name} - ${m.classesattended}</li>`).join('');
}

async function getChildren() {
    const mid = parseInt(document.getElementById('parentMidChildren').value);
    if (isNaN(mid) || mid <= 0) {
        alert('Please enter a valid Member ID');
        return;
    }
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/children?mid=${mid}`);
    const ul = document.getElementById('childrenResult');
    ul.innerHTML = data.error || data.children.map(c => `<li>${c.name}</li>`).join('');
}

async function getRevenue() {
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    if (isNaN(month) || month < 1 || month > 12 || isNaN(year) || year < 2000) {
        alert('Please enter a valid month (1-12) and year');
        return;
    }
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/package-revenue?month=${month}&year=${year}`);
    const ul = document.getElementById('revenueResult');
    ul.innerHTML = data.error || data.revenue.map(r => `<li>${r.description}: $${r.totalrevenue}</li>`).join('');
}

async function searchName() {
    const substring = document.getElementById('nameSubstring').value;
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/search-name?substring=${substring}`);
    const ul = document.getElementById('nameResult');
    ul.innerHTML = data.error || data.members.map(m => `<li>${m.name} - ${m.joindate}</li>`).join('');
}

async function getDiscounted() {
    const skip = parseInt(document.getElementById('skip').value);
    if (isNaN(skip) || skip < 0) {
        alert('Please enter a valid number to skip');
        return;
    }
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/discounted-subscriptions?skip=${skip}`);
    const ul = document.getElementById('discountResult');
    ul.innerHTML = data.error || data.subscriptions.map(s => `<li>${s.name} - $${s.subscriptionfee}</li>`).join('');
}

async function countReferrals() {
    const mid = parseInt(document.getElementById('referralMid').value);
    if (isNaN(mid) || mid <= 0) {
        alert('Please enter a valid Member ID');
        return;
    }
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/count-referrals?mid=${mid}`);
    document.getElementById('referralResult').textContent = data.error || `Referrals: ${data.referralCount}`;
}