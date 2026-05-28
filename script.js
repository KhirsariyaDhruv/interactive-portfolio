// Interactive elements for the Kinetic Sentinel Portfolio

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
    // Navigation active state toggle
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3D Tilt Effect for Credential Cards
    const credentialCards = document.querySelectorAll('.credential-card');
    
    credentialCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Map mouse coordinates to rotation (-10 to 10 degrees max)
            const rotateX = -(y / (rect.height / 2)) * 10;
            const rotateY = (x / (rect.width / 2)) * 10;
            
            // No transition during tracking for instant 1:1 mapping
            card.style.transition = 'none';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            // Spring physics reset
            card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text1 = "// CS STUDENT &";
        const text2 = "SECURITY RESEARCHER";
        heroTitle.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor"></span>';
        const typeTarget = heroTitle.querySelector('.typewriter-text');
        
        let i = 0;
        let isLine2 = false;
        
        function typeWriter() {
            if (!isLine2) {
                if (i < text1.length) {
                    typeTarget.innerHTML += text1.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80);
                } else {
                    typeTarget.innerHTML += '<br>';
                    isLine2 = true;
                    i = 0;
                    setTimeout(typeWriter, 80);
                }
            } else {
                if (i < text2.length) {
                    typeTarget.innerHTML += text2.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80);
                }
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Scroll Animation Observer for Timeline
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el);
    });



});


// --- DYNAMIC DATA FETCHING & TRACKING ---

document.addEventListener('DOMContentLoaded', () => {
    // 2. Fetch Projects with Fallback Data
    const projectsGrid = document.getElementById('dynamic-projects-grid');
    const fallbackProjects = [
        {
            title: "POS Billing System",
            version: "v1.0.0",
            status: "STATUS: OPERATIONAL // RETAIL SOLUTION",
            description: "A full-featured Point of Sale billing system designed for provision stores. Handles product management, invoice generation, and real-time sales tracking with a clean browser-based interface.",
            tags: "HTML,CSS,JAVASCRIPT,PHP,PHPMYADMIN",
            folder_link: "#",
            code_link: "#",
            live_link: "https://hitanshparikh.tech/pos/"
        },
        {
            title: "Autonomous Rover",
            version: "v1.2.0",
            status: "STATUS: ACTIVE // HARDWARE & ROBOTICS",
            description: "A remotely operated rover built on Raspberry Pi 5 with Arduino-based motor control. Uses servo motors for directional movement and encoders for precise speed and distance feedback, enabling obstacle avoidance.",
            tags: "ARDUINO IDE,RASPBERRY PI 5,SERVO MOTOR,ENCODER",
            folder_link: "#",
            code_link: "#",
            live_link: "#"
        }
    ];

    function displayProjects(data) {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        data.forEach(p => {
            const tagsHtml = p.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('');
            
            projectsGrid.innerHTML += `
                <div class="project-card">
                    <div class="project-version">${p.version}</div>
                    <div class="project-header">
                        <h3 class="project-title"><a href="${p.live_link !== '#' ? p.live_link : '#'}" target="_blank" style="color: inherit; text-decoration: none;">${p.title}</a></h3>
                        <div class="project-links">
                            <a href="${p.folder_link}" aria-label="Folder"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg></a>
                            <a href="${p.code_link}" aria-label="Code"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></a>
                            <a href="${p.live_link}" target="_blank" aria-label="External Link"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                        </div>
                    </div>
                    <div class="project-status">${p.status}</div>
                    <p class="project-desc">${p.description}</p>
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                </div>
            `;
        });
    }

    if (projectsGrid) {
        fetch('api/projects.php')
            .then(res => res.json())
            .then(json => {
                if (json.success && json.data && json.data.length > 0) {
                    displayProjects(json.data);
                } else {
                    console.log("No projects found in database or database connection failed. Loading fallback projects.");
                    displayProjects(fallbackProjects);
                }
            })
            .catch(e => {
                console.error("Error loading projects from database, loading fallback projects:", e);
                displayProjects(fallbackProjects);
            });
    }

    // 3. Fetch Certificates
    const certsFolder = document.getElementById('dynamic-certificates-folder');
    if (certsFolder) {
        if (window.CERT_IMAGES && window.CERT_IMAGES.length > 0) {
            // Local fallback data available
            window.certificatesData = window.CERT_IMAGES.map(img => ({ image_path: img }));
            window.currentCertPage = 0;
            renderCertificates();
        } else {
            fetch('api/certificates.php')
                .then(res => res.json())
                .then(json => {
                    if(json.success && json.data.length > 0) {
                        window.certificatesData = json.data;
                        window.currentCertPage = 0;
                        renderCertificates();
                    }
                })
                .catch(e => console.error("Error loading certificates:", e));
        }
    }

    function renderCertificates() {
        const folderContainer = document.getElementById('dynamic-certificates-folder');
        if (!folderContainer) return;
        
        const fronts = folderContainer.querySelectorAll('.folder__front');
        const start = window.currentCertPage * 3;
        const pageData = window.certificatesData.slice(start, start + 3);
        
        // Remove existing papers
        folderContainer.querySelectorAll('.paper').forEach(p => p.remove());
        
        // Add new papers
        const newPapers = [];
        pageData.forEach((c) => {
            const paper = document.createElement('div');
            paper.className = 'paper';
            paper.style.backgroundImage = `url('${c.image_path}')`;
            paper.style.cursor = 'pointer';
            paper.onclick = (e) => {
                const folder = folderContainer.closest('.folder');
                if (folder.classList.contains('open')) {
                    e.stopPropagation();
                    openCertModal(c.image_path);
                }
            };
            
            // Re-apply magnetic hover logic here since dynamic ones missed the folder.js logic
            paper.addEventListener('mousemove', (e) => {
                const folder = folderContainer.closest('.folder');
                if (!folder.classList.contains('open')) {
                    paper.style.transform = '';
                    return;
                }
                const rect = paper.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const offsetX = (e.clientX - centerX) * 0.15;
                const offsetY = (e.clientY - centerY) * 0.15;
                
                paper.style.setProperty('--magnet-x', `${offsetX}px`);
                paper.style.setProperty('--magnet-y', `${offsetY}px`);
            });

            paper.addEventListener('mouseleave', () => {
                paper.style.setProperty('--magnet-x', `0px`);
                paper.style.setProperty('--magnet-y', `0px`);
            });
            
            newPapers.push(paper);
        });
        
        // Append papers before .folder__front
        newPapers.forEach(p => folderContainer.insertBefore(p, fronts[0] || null));
        
        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        const prevBtn = document.getElementById('prev-cert-btn');
        const nextBtn = document.getElementById('next-cert-btn');
        if (!prevBtn || !nextBtn) return;
        
        if (window.currentCertPage > 0) {
            prevBtn.style.display = 'inline-flex';
        } else {
            prevBtn.style.display = 'none';
        }
        
        if ((window.currentCertPage + 1) * 3 < window.certificatesData.length) {
            nextBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'none';
        }
    }

    const prevBtn = document.getElementById('prev-cert-btn');
    const nextBtn = document.getElementById('next-cert-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.currentCertPage > 0) {
                window.currentCertPage--;
                renderCertificates();
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if ((window.currentCertPage + 1) * 3 < window.certificatesData.length) {
                window.currentCertPage++;
                renderCertificates();
            }
        });
    }
});

// Certificate Modal Logic
function openCertModal(imageSrc) {
    // Check if modal exists
    let modal = document.getElementById('cert-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cert-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        modal.style.backdropFilter = 'blur(10px)';
        modal.style.zIndex = '9999';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.cursor = 'zoom-out';
        
        const img = document.createElement('img');
        img.id = 'cert-modal-img';
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.objectFit = 'contain';
        img.style.border = '2px solid var(--primary)';
        img.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.2)';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'transform 0.3s ease';
        
        modal.appendChild(img);
        
        // Close on click
        modal.onclick = () => {
            modal.style.opacity = '0';
            img.style.transform = 'scale(0.9)';
            setTimeout(() => { modal.style.display = 'none'; }, 300);
        };
        
        document.body.appendChild(modal);
    }
    
    // Set image and show
    const imgElement = document.getElementById('cert-modal-img');
    imgElement.src = imageSrc;
    modal.style.display = 'flex';
    
    // Trigger animation
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        imgElement.style.transform = 'scale(1)';
    });
}
