document.addEventListener('DOMContentLoaded', () => {
    // 1. Portfolio Data Structure (Categorized based on requirements)
    const portfolioData = [
        {
            section: "Illustrations",
            subtitles: [
                {
                    title: "Abogrado Illustrations",
                    images: [
                        "abogadro angry.png",
                        "abogadro celebrating.png",
                        "abogadro excited.png",
                        "abogadro greeting.png",
                        "ent tes2al abogadro ygawb.png"
                    ]
                },
                {
                    title: "Character Design",
                    images: [
                        "Balto-white coat-design.png"
                    ]
                }
            ]
        },
        {
            section: "Social Media",
            subtitles: [
                {
                    title: "CCEW 24",
                    images: [
                        "webinar.png",
                        "promotion.png",
                        "Event Cover.png"
                    ]
                }
            ]
        },
        {
            section: "Additions or Random Works",
            subtitles: [
                {
                    title: "Miscellaneous",
                    images: [
                        "Call for media GEER HEADS (not shared).png",
                        "demagh sha8ala msh betnm.jpg",
                        "February chemistry cafe.png",
                        "printable gift.png",
                        "types of plate movements-01.png",
                        "Announcement.png",
                        "Webinar (not shared).png"
                    ]
                }
            ]
        }
    ];

    const portfolioContainer = document.getElementById('portfolio-container');

    // 2. Inject Categories and Images
    portfolioData.forEach(sectionItem => {
        // Create Section Wrapper
        const sectionEl = document.createElement('div');
        sectionEl.classList.add('portfolio-group');
        
        const sectionTitle = document.createElement('h2');
        sectionTitle.classList.add('section-title');
        sectionTitle.innerText = sectionItem.section;
        sectionEl.appendChild(sectionTitle);

        // Iterate through subtitles
        sectionItem.subtitles.forEach(subItem => {
            const subtitleWrapper = document.createElement('div');
            subtitleWrapper.classList.add('portfolio-subtitle-wrapper');

            const subTitleEl = document.createElement('h3');
            subTitleEl.classList.add('subtitle-title');
            subTitleEl.innerText = subItem.title;
            subtitleWrapper.appendChild(subTitleEl);

            // Create Grid for this subtitle
            const gridEl = document.createElement('div');
            gridEl.classList.add('standard-grid');

            // Inject Images into Grid
            subItem.images.forEach(imgSrc => {
                let title = imgSrc.replace(/\.[^/.]+$/, ""); // Remove extension
                title = title.replace(/-/g, " ").replace(/_/g, " "); // Replace dashes/underscores
                title = title.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize

                const card = document.createElement('div');
                card.classList.add('image-card');
                
                // Add highlight logic
                if (imgSrc === "ent tes2al abogadro ygawb.png") {
                    card.classList.add('fancy-highlight');
                }

                card.innerHTML = `
                    <img src="${imgSrc}" alt="${title}" loading="lazy" onerror="this.src=''; this.alt='Image missing: ${title}';">
                    <div class="card-overlay">
                        <h4 class="card-title">${title}</h4>
                    </div>
                `;
                gridEl.appendChild(card);
            });

            subtitleWrapper.appendChild(gridEl);
            sectionEl.appendChild(subtitleWrapper);
        });

        portfolioContainer.appendChild(sectionEl);
    });

    // 3. Custom Cursor Glow (Complex UI element)
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        // We use requestAnimationFrame for smoother performance
        window.requestAnimationFrame(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    });

    // 4. Advanced 3D Tilt Effect for Complex Imaging Logic
    const cards = document.querySelectorAll('.image-card');
    
    function handleTilt(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on cursor position (max 12 degrees)
        const rotateX = ((y - centerY) / centerY) * -12; 
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    }

    function resetTilt(e) {
        const card = e.currentTarget;
        card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }

    cards.forEach(card => {
        // Add tilt
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
        // Add click for lightbox
        card.addEventListener('click', () => openModal(card));
    });

    // Interactive 3D tilt and spotlight for the About panel
    const aboutPanel = document.querySelector('.about-content');
    if (aboutPanel) {
        aboutPanel.addEventListener('mousemove', (e) => {
            const rect = aboutPanel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 8 degrees for a larger panel)
            const rotateX = ((y - centerY) / centerY) * -8; 
            const rotateY = ((x - centerX) / centerX) * 8;

            aboutPanel.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Spotlight effect positioning
            aboutPanel.style.setProperty('--x', `${x}px`);
            aboutPanel.style.setProperty('--y', `${y}px`);
        });

        aboutPanel.addEventListener('mouseleave', () => {
            aboutPanel.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
        });
    }

    // 5. Scroll Reveal Intersection Observer for smooth entry animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Determine a slight stagger if multiple enter the viewport simultaneously
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, idx * 100); // 100ms stagger per item in loop
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });

    // 6. Lightbox Modal Functionality (Complex full-screen viewing)
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.getElementById('modal-close');
    const backdrop = document.getElementById('modal-backdrop');

    function openModal(card) {
        const img = card.querySelector('img');
        const title = card.querySelector('.card-title').innerText;
        
        modalImg.src = img.src;
        modalCaption.innerText = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Allow ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Smooth scrolling for hero "Explore" button
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Floating Interactive Panel Toggle (for Mobile/Touch)
    const floatingPanel = document.getElementById('floating-panel');
    if (floatingPanel) {
        floatingPanel.addEventListener('click', function(e) {
            // Prevent toggling if the user clicks the actual button inside
            if (e.target.tagName !== 'A') {
                this.classList.toggle('expanded');
            }
        });
    }
});
