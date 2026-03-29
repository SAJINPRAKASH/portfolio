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

    // --- Social Media Gallery Logic ---
    const socialMediaGrid = document.getElementById('social-media-grid');
    if (socialMediaGrid) {
        populateSocialMediaGrid(socialMediaGrid);
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
    { id: 17, title: "mockup1", category: "photoshop", image: "assets/mockups/mockup1.jpg", description: "mockup1", gallery: [] },
    { id: 18, title: "mockup10", category: "photoshop", image: "assets/mockups/mockup10.png", description: "mockup10", gallery: [] },
    { id: 19, title: "mockup11", category: "photoshop", image: "assets/mockups/mockup11.jpg", description: "mockup11", gallery: [] },
    { id: 20, title: "mockup12", category: "photoshop", image: "assets/mockups/mockup12.jpg", description: "mockup12", gallery: [] },
    { id: 21, title: "mockup13", category: "photoshop", image: "assets/mockups/mockup13.jpg", description: "mockup13", gallery: [] },
    { id: 22, title: "mockup14", category: "photoshop", image: "assets/mockups/mockup14.jpg", description: "mockup14", gallery: [] },
    { id: 23, title: "mockup15", category: "photoshop", image: "assets/mockups/mockup15.png", description: "mockup15", gallery: [] },
    { id: 24, title: "mockup16", category: "photoshop", image: "assets/mockups/mockup16.png", description: "mockup16", gallery: [] },
    { id: 25, title: "mockup17", category: "photoshop", image: "assets/mockups/mockup17.png", description: "mockup17", gallery: [] },
    { id: 26, title: "mockup18", category: "photoshop", image: "assets/mockups/mockup18.jpg", description: "mockup18", gallery: [] },
    { id: 27, title: "mockup19", category: "photoshop", image: "assets/mockups/mockup19.png", description: "mockup19", gallery: [] },
    { id: 28, title: "mockup2", category: "photoshop", image: "assets/mockups/mockup2.jpg", description: "mockup2", gallery: [] },
    { id: 29, title: "mockup20", category: "photoshop", image: "assets/mockups/mockup20.png", description: "mockup20", gallery: [] },
    { id: 30, title: "mockup21", category: "photoshop", image: "assets/mockups/mockup21.png", description: "mockup21", gallery: [] },
    { id: 31, title: "mockup22", category: "photoshop", image: "assets/mockups/mockup22.png", description: "mockup22", gallery: [] },
    { id: 32, title: "mockup23", category: "photoshop", image: "assets/mockups/mockup23.png", description: "mockup23", gallery: [] },
    { id: 33, title: "mockup24", category: "photoshop", image: "assets/mockups/mockup24.png", description: "mockup24", gallery: [] },
    { id: 34, title: "mockup25", category: "photoshop", image: "assets/mockups/mockup25.png", description: "mockup25", gallery: [] },
    { id: 35, title: "mockup26", category: "photoshop", image: "assets/mockups/mockup26.png", description: "mockup26", gallery: [] },
    { id: 36, title: "mockup27", category: "photoshop", image: "assets/mockups/mockup27.png", description: "mockup27", gallery: [] },
    { id: 37, title: "mockup28", category: "photoshop", image: "assets/mockups/mockup28.png", description: "mockup28", gallery: [] },
    { id: 38, title: "mockup29", category: "photoshop", image: "assets/mockups/mockup29.png", description: "mockup29", gallery: [] },
    { id: 39, title: "mockup3", category: "photoshop", image: "assets/mockups/mockup3.jpg", description: "mockup3", gallery: [] },
    { id: 40, title: "mockup30", category: "photoshop", image: "assets/mockups/mockup30.jpg", description: "mockup30", gallery: [] },
    { id: 41, title: "mockup31", category: "photoshop", image: "assets/mockups/mockup31.png", description: "mockup31", gallery: [] },
    { id: 42, title: "mockup32", category: "photoshop", image: "assets/mockups/mockup32.jpg", description: "mockup32", gallery: [] },
    { id: 43, title: "mockup33", category: "photoshop", image: "assets/mockups/mockup33.png", description: "mockup33", gallery: [] },
    { id: 44, title: "mockup34", category: "photoshop", image: "assets/mockups/mockup34.png", description: "mockup34", gallery: [] },
    { id: 45, title: "mockup35", category: "photoshop", image: "assets/mockups/mockup35.png", description: "mockup35", gallery: [] },
    { id: 46, title: "mockup36", category: "photoshop", image: "assets/mockups/mockup36.png", description: "mockup36", gallery: [] },
    { id: 47, title: "mockup37", category: "photoshop", image: "assets/mockups/mockup37.png", description: "mockup37", gallery: [] },
    { id: 48, title: "mockup38", category: "photoshop", image: "assets/mockups/mockup38.png", description: "mockup38", gallery: [] },
    { id: 49, title: "mockup39", category: "photoshop", image: "assets/mockups/mockup39.png", description: "mockup39", gallery: [] },
    { id: 50, title: "mockup4", category: "photoshop", image: "assets/mockups/mockup4.jpg", description: "mockup4", gallery: [] },
    { id: 51, title: "mockup5", category: "photoshop", image: "assets/mockups/mockup5.png", description: "mockup5", gallery: [] },
    { id: 52, title: "mockup6", category: "photoshop", image: "assets/mockups/mockup6.png", description: "mockup6", gallery: [] },
    { id: 53, title: "mockup7", category: "photoshop", image: "assets/mockups/mockup7.png", description: "mockup7", gallery: [] },
    { id: 54, title: "mockup8", category: "photoshop", image: "assets/mockups/mockup8.png", description: "mockup8", gallery: [] },
    { id: 55, title: "mockup9", category: "photoshop", image: "assets/mockups/mockup9.png", description: "mockup9", gallery: [] },  
    { id: 56, title: "back", category: "photoshop", image: "assets/design/back.jpg", description: "back", gallery: [] },
    { id: 57, title: "work1", category: "photoshop", image: "assets/design/work1.jpg", description: "work1", gallery: [] },
    { id: 58, title: "work10", category: "photoshop", image: "assets/design/work10.png", description: "work10", gallery: [] },
    { id: 59, title: "work11", category: "photoshop", image: "assets/design/work11.jpg", description: "work11", gallery: [] },
    { id: 60, title: "work12", category: "photoshop", image: "assets/design/work12.jpg", description: "work12", gallery: [] },
    { id: 61, title: "work13", category: "photoshop", image: "assets/design/work13.jpg", description: "work13", gallery: [] },
    { id: 62, title: "work14", category: "photoshop", image: "assets/design/work14.jpg", description: "work14", gallery: [] },
    { id: 63, title: "work15", category: "photoshop", image: "assets/design/work15.jpg", description: "work15", gallery: [] },
    { id: 64, title: "work16", category: "photoshop", image: "assets/design/work16.jpg", description: "work16", gallery: [] },
    { id: 65, title: "work17", category: "photoshop", image: "assets/design/work17.jpg", description: "work17", gallery: [] },
    { id: 66, title: "work2", category: "photoshop", image: "assets/design/work2.jpg", description: "work2", gallery: [] },
    { id: 67, title: "work21", category: "photoshop", image: "assets/design/work21.jpg", description: "work21", gallery: [] },
    { id: 68, title: "work22", category: "photoshop", image: "assets/design/work22.jpg", description: "work22", gallery: [] },
    { id: 69, title: "work23", category: "photoshop", image: "assets/design/work23.jpg", description: "work23", gallery: [] },
    { id: 70, title: "work24", category: "photoshop", image: "assets/design/work24.jpg", description: "work24", gallery: [] },
    { id: 71, title: "work25", category: "photoshop", image: "assets/design/work25.jpg", description: "work25", gallery: [] },
    { id: 72, title: "work29", category: "photoshop", image: "assets/design/work29.jpg", description: "work29", gallery: [] },
    { id: 73, title: "work3", category: "photoshop", image: "assets/design/work3.jpg", description: "work3", gallery: [] },
    { id: 74, title: "work30", category: "photoshop", image: "assets/design/work30.jpg", description: "work30", gallery: [] },
    { id: 75, title: "work31", category: "photoshop", image: "assets/design/work31.jpg", description: "work31", gallery: [] },
    { id: 76, title: "work32", category: "photoshop", image: "assets/design/work32.jpg", description: "work32", gallery: [] },
    { id: 77, title: "work33", category: "photoshop", image: "assets/design/work33.jpg", description: "work33", gallery: [] },
    { id: 78, title: "work34", category: "photoshop", image: "assets/design/work34.jpg", description: "work34", gallery: [] },
    { id: 79, title: "work35", category: "photoshop", image: "assets/design/work35.jpg", description: "work35", gallery: [] },
    { id: 80, title: "work36", category: "photoshop", image: "assets/design/work36.jpg", description: "work36", gallery: [] },
    { id: 81, title: "work37", category: "photoshop", image: "assets/design/work37.jpg", description: "work37", gallery: [] },
    { id: 82, title: "work38", category: "photoshop", image: "assets/design/work38.jpg", description: "work38", gallery: [] },
    { id: 83, title: "work39", category: "photoshop", image: "assets/design/work39.jpg", description: "work39", gallery: [] },
    { id: 84, title: "work4", category: "photoshop", image: "assets/design/work4.jpg", description: "work4", gallery: [] },
    { id: 85, title: "work41", category: "photoshop", image: "assets/design/work41.jpg", description: "work41", gallery: [] },
    { id: 86, title: "work42", category: "photoshop", image: "assets/design/work42.jpg", description: "work42", gallery: [] },
    { id: 87, title: "work43", category: "photoshop", image: "assets/design/work43.jpg", description: "work43", gallery: [] },
    { id: 88, title: "work44", category: "photoshop", image: "assets/design/work44.jpg", description: "work44", gallery: [] },
    { id: 89, title: "work45", category: "photoshop", image: "assets/design/work45.jpg", description: "work45", gallery: [] },
    { id: 90, title: "work46", category: "photoshop", image: "assets/design/work46.jpg", description: "work46", gallery: [] },
    { id: 91, title: "work47", category: "photoshop", image: "assets/design/work47.jpg", description: "work47", gallery: [] },
    { id: 92, title: "work48", category: "photoshop", image: "assets/design/work48.jpg", description: "work48", gallery: [] },
    { id: 93, title: "work49", category: "photoshop", image: "assets/design/work49.jpg", description: "work49", gallery: [] },
    { id: 94, title: "work5", category: "photoshop", image: "assets/design/work5.jpg", description: "work5", gallery: [] },
    { id: 95, title: "work50", category: "photoshop", image: "assets/design/work50.jpg", description: "work50", gallery: [] },
    { id: 96, title: "work51", category: "photoshop", image: "assets/design/work51.jpg", description: "work51", gallery: [] },
    { id: 97, title: "work53", category: "photoshop", image: "assets/design/work53.jpg", description: "work53", gallery: [] },
    { id: 98, title: "work54", category: "photoshop", image: "assets/design/work54.jpg", description: "work54", gallery: [] },
    { id: 99, title: "work55", category: "photoshop", image: "assets/design/work55.jpg", description: "work55", gallery: [] },
    { id: 100, title: "work56", category: "photoshop", image: "assets/design/work56.jpg", description: "work56", gallery: [] },
    { id: 101, title: "work57", category: "photoshop", image: "assets/design/work57.jpg", description: "work57", gallery: [] },
    { id: 102, title: "work58", category: "photoshop", image: "assets/design/work58.jpg", description: "work58", gallery: [] },
    { id: 103, title: "work59", category: "photoshop", image: "assets/design/work59.jpg", description: "work59", gallery: [] },
    { id: 104, title: "work60", category: "photoshop", image: "assets/design/work60.jpg", description: "work60", gallery: [] },
    { id: 105, title: "work63", category: "photoshop", image: "assets/design/work63.jpg", description: "work63", gallery: [] },
    { id: 106, title: "work7", category: "photoshop", image: "assets/design/work7.png", description: "work7", gallery: [] },
    { id: 107, title: "work8", category: "photoshop", image: "assets/design/work8.jpg", description: "work8", gallery: [] },
    { id: 108, title: "work9", category: "photoshop", image: "assets/design/work9.png", description: "work9", gallery: [] },
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

async function renderProjects() {
    const galleryGrid = document.getElementById('gallery-grid');
    const loadMoreContainer = document.getElementById('load-more-container');

    galleryGrid.innerHTML = '';

    // Handle custom HTML page loads for specific filters
    const customPages = {
        'branding': 'branding-design.html',
        'photoshop': 'social-media-design.html',
        'illustrator': 'illustrator-media-design.html'
    };

    if (customPages[currentFilter]) {
        loadMoreContainer.style.display = 'none';
        galleryGrid.style.display = 'block'; // Override grid layout for block
        galleryGrid.innerHTML = `<div style="text-align: center; padding: 4rem; color: #aaa; font-family: monospace;">Loading ${currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)} Projects...</div>`;
        
        try {
            const res = await fetch(customPages[currentFilter]);
            if (!res.ok) throw new Error(`Could not fetch ${customPages[currentFilter]}`);
            const text = await res.text();
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const section = doc.querySelector('.service-portfolio-section');
            
            if (section) {
                galleryGrid.innerHTML = '';
                galleryGrid.appendChild(section);
                if (currentFilter === 'photoshop') {
                    populateSocialMediaGrid(section);
                }
            } else {
                throw new Error(`Section not found in ${customPages[currentFilter]}`);
            }
        } catch (e) {
            console.error(e);
            galleryGrid.innerHTML = '<div style="color: #ff4444;text-align:center;padding:3rem;">Cannot load content.<br>If you are opening this via file://, browser security blocks it. Please use a local web server.</div>';
        }
        return; // Exit
    }

    // Reset grid display for normal cards
    galleryGrid.style.display = '';

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

function populateSocialMediaGrid(container) {
    if (!container) return;
    const grid = container.classList.contains('social-media-grid') ? container : container.querySelector('.social-media-grid');
    if (!grid) return;
    
    const photoshopProjects = projects.filter(p => p.category === 'photoshop');
    grid.innerHTML = '';
    
    photoshopProjects.forEach((project, index) => {
        const item = document.createElement('div');
        item.classList.add('social-media-item');
        item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        
        item.innerHTML = `<img src="${project.image}" alt="${project.title}" loading="lazy">`;
        
        item.addEventListener('click', () => {
            if (typeof openModal === 'function') {
                openModal(project);
            }
        });
        
        grid.appendChild(item);
    });
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
