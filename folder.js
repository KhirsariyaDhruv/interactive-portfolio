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

        // Magnetic hover and click logic for dynamic papers is handled in script.js
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
