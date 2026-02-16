// Simple script to update date or handle interactions
document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic date like in design "MAY 09, 2026"
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const updateDate = () => {
            const now = new Date();
            const options = { month: 'long', day: '2-digit', year: 'numeric' };
            dateEl.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
        };
        updateDate();
        // Update every minute just in case
        setInterval(updateDate, 60000);
    }

    // --- Navigation Toggle Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const closeBtn = document.querySelector('.close-menu-btn');
    const navLinks = document.querySelectorAll('.nav-link');

    // Open Menu
    if (menuToggle && navOverlay) {
        menuToggle.addEventListener('click', () => {
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    // Close Menu with X button
    if (closeBtn && navOverlay) {
        closeBtn.addEventListener('click', () => {
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close Menu when clicking a link
    if (navLinks.length > 0 && navOverlay) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Optional: Parallax effect on mouse move
    const hero = document.querySelector('.hero');
    const text = document.querySelector('.giant-text');

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) { // Only on desktop
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            // Move text slightly opposite to cursor, preserving the centering transform
            if (text) {
                text.style.transform = `translate(-50%, -50%) translate(${-x}px, ${-y}px)`;
            }
        }
    });

    // --- Scroll Progress Indicator Logic ---
    const progressPath = document.querySelector('.progress-path');

    if (progressPath) {
        const pathLength = progressPath.getTotalLength();
        const progressWrap = document.querySelector('.progress-wrap');
        const progressText = document.querySelector('.progress-text');

        // Initial setup
        progressPath.style.transition = progressPath.style.transition = 'none';
        progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = 'stroke-dashoffset 10ms linear';

        const updateProgress = () => {
            const scroll = window.scrollY; // Current scroll position
            const height = document.body.scrollHeight - window.innerHeight; // Total scrollable height
            const progress = pathLength - (scroll * pathLength / height);

            // Update circle stroke
            progressPath.style.strokeDashoffset = progress;

            // Update percentage text
            if (progressText) {
                const percent = Math.round((scroll / height) * 100);
                progressText.innerText = `${percent}%`;
            }

            // Show/Hide indicator based on scroll
            if (progressWrap) {
                if (scroll > 50) {
                    progressWrap.classList.add('active-progress');
                } else {
                    progressWrap.classList.remove('active-progress');
                }
            }
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Run once on load

        // Scroll to top on click
        if (progressWrap) {
            progressWrap.addEventListener('click', (event) => {
                event.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // --- Project Gallery Logic ---
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        initGallery();
    }

    // --- Contact Form Logic ---
    const emailCard = document.getElementById('email-card');
    if (emailCard) {
        emailCard.addEventListener('click', (e) => {
            // Don't toggle if clicking inside the form (inputs/button)
            if (e.target.closest('#contact-form')) return;
            emailCard.classList.toggle('expanded');
        });
    }
});

// --- Projects Data ---
// Using mywork assets 1-16
const projects = [
    { id: 1, title: "Grow Mush", category: "branding", image: "assets/mywork1.png", description: "Strategic branding and identity design for Grow Mush, highlighting organic quality.", gallery: ["assets/mywork1.png"] },
    { id: 2, title: "Minimalist Icons", category: "illustrator", image: "assets/mywork2.png", description: "A set of clean, scalable vector icons designed for modern UI applications.", gallery: [] },
    { id: 3, title: "Event Poster", category: "photoshop", image: "assets/mywork3.png", description: "Dynamic poster design creating visual impact for an upcoming event.", gallery: [] },
    { id: 4, title: "Product Packaging", category: "branding", image: "assets/mywork4.png", description: "Packaging design aimed at standing out on the shelf with bold visuals.", gallery: [] },
    { id: 5, title: "Vector Illustration", category: "illustrator", image: "assets/mywork5.png", description: "Intricate vector illustration showcasing attention to detail and color.", gallery: [] },
    { id: 6, title: "Digital Art", category: "photoshop", image: "assets/mywork6.png", description: "Creative digital compositing and painting.", gallery: [] },
    { id: 7, title: "Corporate Identity", category: "branding", image: "assets/mywork7.png", description: "Complete stationary and identity suite for a corporate client.", gallery: [] },
    { id: 8, title: "Social Media Campaign", category: "web", image: "assets/mywork8.png", description: "Engaging visuals designed for high conversion on social platforms.", gallery: [] },
    { id: 9, title: "App UI Concept", category: "web", image: "assets/mywork9.png", description: "User interface design for a mobile application focusing on UX.", gallery: [] },
    { id: 10, title: "Marketing Visual", category: "branding", image: "assets/mywork10.png", description: "Key visual created for a broad marketing campaign.", gallery: [] },
    { id: 11, title: "Logo Evolution", category: "branding", image: "assets/mywork11.png", description: "Modernizing a brand's logo while retaining its heritage.", gallery: [] },
    { id: 12, title: "Web Banner", category: "web", image: "assets/mywork12.png", description: "Promotional web banner for a sales campaign.", gallery: [] },
    { id: 13, title: "Brochure Layout", category: "branding", image: "assets/mywork13.png", description: "Print brochure design with a focus on readability and flow.", gallery: [] },
    { id: 14, title: "Character Design", category: "illustrator", image: "assets/mywork14.png", description: "Character creation for an animation project.", gallery: [] },
    { id: 15, title: "Festival Poster", category: "photoshop", image: "assets/mywork15.png", description: "Vibrant poster celebrating a cultural festival.", gallery: [] },
    { id: 16, title: "Photo Manipulation", category: "photoshop", image: "assets/mywork16.jpg", description: "Surreal photo manipulation combining multiple elements.", gallery: [] },
];

let visibleCount = document.body.classList.contains('portfolio-page') ? 100 : 6;
let currentFilter = 'all';

function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadMoreContainer = document.getElementById('load-more-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Render initial
    renderProjects();

    // Setup Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.getAttribute('data-filter');
            visibleCount = 6; // Reset on filter change
            renderProjects();
        });
    });

    // Setup Load More
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 6;
            renderProjects();
        });
    }
}

function renderProjects() {
    const galleryGrid = document.getElementById('gallery-grid');
    const loadMoreContainer = document.getElementById('load-more-container');

    galleryGrid.innerHTML = '';

    const filtered = currentFilter === 'all'
        ? projects
        : projects.filter(p => p.category === currentFilter);

    const toShow = filtered.slice(0, visibleCount);

    toShow.forEach((project, index) => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        // Staggered animation
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;

        card.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-category">${project.category}</span>
            </div>
        `;

        card.addEventListener('click', () => openModal(project));
        galleryGrid.appendChild(card);
    });

    // Check Load More visibility
    if (visibleCount < filtered.length) {
        loadMoreContainer.style.display = 'flex';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

// --- Modal Logic ---
function openModal(project) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDesc = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const modalGallery = document.getElementById('modal-gallery');

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDesc.textContent = project.description;
    modalImage.src = project.image;

    modalGallery.innerHTML = '';
    if (project.gallery && project.gallery.length > 0) {
        project.gallery.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.classList.add('modal-gallery-img');
            img.onclick = () => { modalImage.src = imgSrc; };
            modalGallery.appendChild(img);
        });
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Close logic
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
}

// --- Email Logic ---
function sendMail() {
    const name = document.getElementById('sender-name').value;
    const email = document.getElementById('sender-email').value;
    const subject = document.getElementById('sender-subject').value;
    const msg = document.getElementById('sender-message').value;
    const btn = document.querySelector('#contact-form button');

    if (name && email && subject && msg) {
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.style.background = '#991b1b';

        setTimeout(() => {
            btn.innerText = 'Message Sent! ✅';
            btn.style.background = '#ea1d24';

            window.location.href = `mailto:sajinprakash989@gmail.com?subject=${encodeURIComponent(subject)}&body=From: ${name} (${email})%0D%0A%0D%0A${encodeURIComponent(msg)}`;

            setTimeout(() => {
                document.getElementById('sender-name').value = '';
                document.getElementById('sender-email').value = '';
                document.getElementById('sender-subject').value = '';
                document.getElementById('sender-message').value = '';
                btn.innerText = originalText;
                btn.style.background = '';
                document.getElementById('email-card').classList.remove('expanded');
            }, 2000);
        }, 1500);
    }
}
