// admin.js

// Permanently fix the "file:///" vs "localhost" issue for XAMPP
if (window.location.protocol === 'file:') {
    const localPath = window.location.pathname;
    // Extract the path after htdocs
    if (localPath.includes('htdocs')) {
        const pathAfterHtdocs = localPath.split('htdocs')[1];
        window.location.href = 'http://localhost' + pathAfterHtdocs;
    } else {
        alert("Please open this file through your XAMPP localhost (http://localhost/portfolio/...) instead of double-clicking it.");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Check Auth Status
    checkAuth();

    // Tab Switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
            
            // Refresh data when switching tabs
            if(btn.dataset.tab === 'analytics') fetchVisitors();
            if(btn.dataset.tab === 'projects') fetchProjects();
            if(btn.dataset.tab === 'certificates') fetchCertificates();
            if(btn.dataset.tab === 'messages') fetchMessages();
        });
    });

    // Login Form
    document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const u = document.getElementById('login-username').value;
        const p = document.getElementById('login-password').value;
        const err = document.getElementById('login-error');
        
        try {
            const res = await fetch('api/login.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({action: 'login', username: u, password: p})
            });
            const data = await res.json();
            
            if (data.success) {
                document.getElementById('login-view').classList.remove('active');
                document.getElementById('dashboard-view').classList.add('active');
                fetchVisitors(); // load initial data
            } else {
                err.textContent = data.message;
                err.style.display = 'block';
            }
        } catch(e) {
            console.error(e);
            err.innerHTML = "Network Error: Are you running through XAMPP?<br>Error details: " + e.message;
            err.style.display = 'block';
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', async () => {
        await fetch('api/login.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: 'logout'})
        });
        window.location.reload();
    });

    // Project Form
    document.getElementById('add-project-btn').addEventListener('click', () => {
        document.getElementById('project-form').reset();
        document.getElementById('proj-id').value = '';
        document.getElementById('project-form-title').textContent = 'Add New Project';
        document.getElementById('project-form-container').style.display = 'block';
    });

    document.getElementById('project-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('proj-id').value;
        
        const payload = {
            title: document.getElementById('proj-title').value,
            version: document.getElementById('proj-version').value,
            status: document.getElementById('proj-status').value,
            tags: document.getElementById('proj-tags').value,
            code_link: document.getElementById('proj-code').value,
            live_link: document.getElementById('proj-live').value,
            description: document.getElementById('proj-desc').value
        };

        if (id) {
            payload.id = id;
            await fetch('api/projects.php', { method: 'PUT', body: JSON.stringify(payload) });
        } else {
            await fetch('api/projects.php', { method: 'POST', body: JSON.stringify(payload) });
        }
        
        document.getElementById('project-form-container').style.display = 'none';
        fetchProjects();
    });

    // Cert Form
    document.getElementById('cert-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('cert-title').value;
        const fileInput = document.getElementById('cert-image');
        const pathInput = document.getElementById('cert-image-path');
        const statusText = document.getElementById('cert-upload-status');
        
        if (!fileInput.files[0] && !pathInput.value.trim()) {
            statusText.textContent = "Please select a file or enter an image path.";
            statusText.style.color = "var(--error)";
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        
        if (fileInput.files[0]) {
            formData.append('image', fileInput.files[0]);
        }
        if (pathInput.value.trim()) {
            formData.append('image_path', pathInput.value.trim());
        }

        statusText.textContent = "Saving certificate...";
        statusText.style.color = "var(--primary)";

        try {
            const res = await fetch('api/certificates.php', {
                method: 'POST',
                body: formData // Note: no JSON headers for FormData
            });
            const data = await res.json();
            if(data.success) {
                statusText.textContent = "Success!";
                statusText.style.color = "var(--secondary)";
                document.getElementById('cert-form').reset();
                fetchCertificates();
            } else {
                statusText.textContent = data.message;
                statusText.style.color = "var(--error)";
            }
        } catch(e) {
            statusText.textContent = "Saving failed.";
            statusText.style.color = "var(--error)";
        }
    });
});

async function checkAuth() {
    try {
        const res = await fetch('api/login.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: 'check'})
        });
        const data = await res.json();
        if (data.success) {
            document.getElementById('login-view').classList.remove('active');
            document.getElementById('dashboard-view').classList.add('active');
            fetchVisitors(); // Load default tab
        }
    } catch (e) {
        // Not logged in, login view remains active
    }
}

// Fetch Functions
async function fetchVisitors() {
    const res = await fetch('api/track_visitor.php');
    if(!res.ok) return;
    const json = await res.json();
    if(json.success) {
        const tbody = document.getElementById('visitors-table-body');
        tbody.innerHTML = '';
        json.data.forEach(v => {
            tbody.innerHTML += `
                <tr>
                    <td style="font-family:monospace; color:var(--secondary)">${v.visit_time}</td>
                    <td style="font-family:monospace; color:var(--primary)">${v.terminal_name || 'N/A'}</td>
                    <td>${v.ip_address}</td>
                    <td>${v.page_url}</td>
                    <td style="font-size:12px; color:var(--outline); max-width: 200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${v.user_agent}">${v.user_agent}</td>
                </tr>
            `;
        });
    }
}

async function fetchProjects() {
    const res = await fetch('api/projects.php');
    const json = await res.json();
    if(json.success) {
        window.allProjects = json.data; // store for editing
        const tbody = document.getElementById('projects-table-body');
        tbody.innerHTML = '';
        json.data.forEach(p => {
            tbody.innerHTML += `
                <tr>
                    <td><strong>${p.title}</strong></td>
                    <td style="font-family:monospace;">${p.version}</td>
                    <td style="font-size:12px;">${p.tags}</td>
                    <td>
                        <button class="action-link" onclick="editProject(${p.id})">Edit</button>
                        <button class="action-link delete" onclick="deleteProject(${p.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    }
}

window.editProject = function(id) {
    const p = window.allProjects.find(x => x.id == id);
    if(p) {
        document.getElementById('proj-id').value = p.id;
        document.getElementById('proj-title').value = p.title;
        document.getElementById('proj-version').value = p.version;
        document.getElementById('proj-status').value = p.status;
        document.getElementById('proj-tags').value = p.tags;
        document.getElementById('proj-code').value = p.code_link;
        document.getElementById('proj-live').value = p.live_link;
        document.getElementById('proj-desc').value = p.description;
        
        document.getElementById('project-form-title').textContent = 'Edit Project';
        document.getElementById('project-form-container').style.display = 'block';
    }
}

window.deleteProject = async function(id) {
    if(confirm('Delete this project?')) {
        await fetch('api/projects.php', { method: 'DELETE', body: JSON.stringify({id}) });
        fetchProjects();
    }
}

async function fetchCertificates() {
    const res = await fetch('api/certificates.php');
    const json = await res.json();
    if(json.success) {
        const tbody = document.getElementById('certs-table-body');
        tbody.innerHTML = '';
        json.data.forEach(c => {
            tbody.innerHTML += `
                <tr>
                    <td><img src="${c.image_path}" alt="cert" style="height: 40px; border-radius: 4px;"></td>
                    <td><strong>${c.title}</strong></td>
                    <td style="font-family:monospace; color:var(--outline)">${c.image_path}</td>
                    <td>
                        <button class="action-link delete" onclick="deleteCert(${c.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    }
}

window.deleteCert = async function(id) {
    if(confirm('Delete this certificate? This will also delete the image file.')) {
        await fetch('api/certificates.php', { method: 'DELETE', body: JSON.stringify({id}) });
        fetchCertificates();
    }
}

async function fetchMessages() {
    try {
        const res = await fetch('api/admin_messages.php');
        const json = await res.json();
        if(json.status === 'success') {
            const tbody = document.getElementById('messages-table-body');
            tbody.innerHTML = '';
            json.data.forEach(m => {
                // Escape HTML
                const safeName = m.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                const safeEmail = m.email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                const safeMessage = m.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                
                tbody.innerHTML += `
                    <tr>
                        <td style="font-family:monospace; color:var(--secondary); min-width: 160px;">${m.created_at}</td>
                        <td><strong>${safeName}</strong></td>
                        <td><a href="mailto:${safeEmail}" style="color:var(--primary); text-decoration:none;">${safeEmail}</a></td>
                        <td style="white-space: pre-wrap; word-break: break-word;">${safeMessage}</td>
                    </tr>
                `;
            });
        }
    } catch(e) {
        console.error("Failed to fetch messages:", e);
    }
}
