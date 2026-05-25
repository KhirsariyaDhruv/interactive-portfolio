document.addEventListener('DOMContentLoaded', () => {
    // Create the modal element dynamically
    const modal = document.createElement('div');
    modal.className = 'cert-modal';
    modal.innerHTML = `
        <div class="cert-modal-content">
            <span class="cert-modal-close">&times;</span>
            <img class="cert-modal-img" src="" alt="Certificate">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.cert-modal-img');
    const closeBtn = modal.querySelector('.cert-modal-close');

    // Close modal handlers
    const closeModal = () => modal.classList.remove('active');
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    const folderContainers = document.querySelectorAll('.folder-container');
    
    folderContainers.forEach(container => {
        const folder = container.querySelector('.folder');
        if (!folder) return;

        folder.addEventListener('click', () => {
            folder.classList.toggle('open');
            container.classList.toggle('is-open');
        });

        // Add magnetic hover effect to papers when folder is open
        const papers = folder.querySelectorAll('.paper');
        papers.forEach(paper => {
            // Modal click handler for the paper
            paper.addEventListener('click', (e) => {
                if (folder.classList.contains('open')) {
                    e.stopPropagation(); // Prevent folder from closing
                    
                    // Extract URL from background-image
                    const bgImage = paper.style.backgroundImage;
                    const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
                    if (urlMatch && urlMatch[1]) {
                        modalImg.src = urlMatch[1];
                        modal.classList.add('active');
                    }
                }
            });

            paper.addEventListener('mousemove', (e) => {
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
        });
    });

    // Center the folder wrapper horizontally on mobile on load
    window.addEventListener('load', () => {
        const wrappers = document.querySelectorAll('.folder-wrapper');
        wrappers.forEach(wrapper => {
            if (window.innerWidth <= 768) {
                // Ensure the folder is centered in the scroll view
                wrapper.scrollLeft = (wrapper.scrollWidth - wrapper.clientWidth) / 2;
            }
        });
    });
});
