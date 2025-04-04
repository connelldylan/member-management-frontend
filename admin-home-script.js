const BACKEND_URL = "https://member-management-backend.onrender.com";
const token = localStorage.getItem('adminToken');

async function fetchWithAuth(url, options = {}) {
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    const res = await fetch(url, options);
    return res.json();
}

async function deleteMember() {
    const mid = document.getElementById('deleteMid').value;
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/delete-member`, {
        method: 'POST',
        body: JSON.stringify({ mid })
    });
    alert(data.error || data.message);
}

async function updateBelt() {
    const mid = document.getElementById('beltMid').value;
    const beltLevel = document.getElementById('beltLevel').value;
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/update-belt`, {
        method: 'POST',
        body: JSON.stringify({ mid, beltLevel })
    });
    alert(data.error || data.message);
}

async function updateAddress() {
    const mid = document.getElementById('addressMid').value;
    const address = document.getElementById('address').value;
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/update-address`, {
        method: 'POST',
        body: JSON.stringify({ mid, address })
    });
    alert(data.error || data.message);
}

async function getAvgClasses() {
    const beltLevel = document.getElementById('avgBelt').value;
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/avg-classes-by-belt?beltLevel=${beltLevel}`);
    document.getElementById('avgResult').textContent = data.error || `Average: ${data.avgClasses}`;
}

async function getNoReferrals() {
    const minFee = document.getElementById('minFee').value;
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/no-referrals-high-fee?minFee=${minFee}`);
    const ul = document.getElementById('noRefResult');
    ul.innerHTML = data.error || data.members.map(m => `<li>${m.name} - ${m.email}</li>`).join('');
}

async function getTopClasses() {
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/top-classes`);
    const ul = document.getElementById('topClassesResult');
    ul.innerHTML = data.error || data.topMembers.map(m => `<li>${m.name} - ${m.classesattended}</li>`).join('');
}

async function getChildren() {
    const mid = document.getElementById('parentMid').value;
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/children?mid=${mid}`);
    const ul = document.getElementById('childrenResult');
    ul.innerHTML = data.error || data.children.map(c => `<li>${c.name}</li>`).join('');
}

async function getRevenue() {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
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
    const skip = document.getElementById('skip').value;
    const data = await fetchWithAuth(`${BACKEND_URL}/admin/discounted-subscriptions?skip=${skip}`);
    const ul = document.getElementById('discountResult');
    ul.innerHTML = data.error || data.subscriptions.map(s => `<li>${s.name} - $${s.subscriptionfee}</li>`).join('');
}