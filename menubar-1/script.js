// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and check if it's loaded
    let gsapLoaded = typeof gsap !== 'undefined';
    
    if (!gsapLoaded) {
        console.warn('GSAP not loaded, using fallback animations');
        // Load GSAP dynamically
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        gsapScript.onload = initAnimations;
        document.head.appendChild(gsapScript);
    } else {
        initAnimations();
    }
    
    function initAnimations() {
        // Elements
        const menuToggle = document.querySelector('.menu-toggle');
        const closeBtn = document.querySelector('.close-btn');
        const menuContainer = document.querySelector('.menu-container');
        const menuItems = document.querySelectorAll('.menu-item');
        const cursor = document.querySelector('.cursor');
        const cursorCircle = document.querySelector('.cursor-circle');
        const progressFill = document.querySelector('.progress-fill');
        const soundToggle = document.querySelector('.sound-toggle');
        const linkChars = document.querySelectorAll('.link-char');
        
        // Menu state
        let isMenuOpen = false;
        
        // Custom cursor
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        // Mouse move handler for custom cursor
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (cursor) {
                // Smooth cursor movement with GSAP
                gsap.to(cursor, {
                    x: mouseX - 10,
                    y: mouseY - 10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .menu-toggle, .close-btn, .sound-toggle, .menu-content p, .menu-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursor) cursor.classList.add('hover');
                if (cursorCircle) {
                    gsap.to(cursorCircle, {
                        scale: 1.8,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                }
            });
            
            el.addEventListener('mouseleave', () => {
                if (cursor) cursor.classList.remove('hover');
                if (cursorCircle) {
                    gsap.to(cursorCircle, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        // Menu toggle
        menuToggle.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', closeMenu);
        
        // Open menu with GSAP animations
        function openMenu() {
            isMenuOpen = true;
            menuToggle.classList.add('active');
            
            // Show menu container
            gsap.to(menuContainer, {
                opacity: 1,
                visibility: 'visible',
                x: 0,
                duration: 0.8,
                ease: "power2.out"
            });
            
            // Animate menu slide in
            gsap.to('.menu', {
                x: 0,
                duration: 1,
                ease: "power2.out",
                delay: 0.1
            });
            
            // Animate overlay
            gsap.to('.menu-overlay', {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            });
            
            // Animate menu items with stagger
            gsap.to('.menu-item', {
                x: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
            });
            
            // Animate link characters
            gsap.to('.link-char', {
                y: 0,
                opacity: 1,
                stagger: 0.03,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: 0.5
            });
            
            // Animate progress bar
            gsap.to(progressFill, {
                width: '100%',
                duration: 1.5,
                ease: "power2.inOut",
                delay: 0.3
            });
            
            // Animate other elements
            gsap.to('.menu-top-title', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.3
            });
            
            gsap.to('.menu-bottom', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.4
            });
        }
        
        // Close menu with GSAP animations
        function closeMenu() {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            
            // Animate menu slide out
            gsap.to('.menu', {
                x: '-100%',
                duration: 0.8,
                ease: "power2.in"
            });
            
            // Animate menu items out
            gsap.to('.menu-item', {
                x: -50,
                opacity: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "power2.in"
            });
            
            // Animate link characters out
            gsap.to('.link-char', {
                y: 100,
                opacity: 0,
                stagger: 0.02,
                duration: 0.4,
                ease: "power2.in"
            });
            
            // Hide menu container
            gsap.to(menuContainer, {
                opacity: 0,
                visibility: 'hidden',
                x: '-100%',
                duration: 0.8,
                ease: "power2.in",
                delay: 0.3
            });
            
            // Reset progress bar
            gsap.to(progressFill, {
                width: '0%',
                duration: 0.5,
                ease: "power2.inOut"
            });
        }
        
        function toggleMenu() {
            if (!isMenuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        }
        
        // Menu item hover animations
        menuItems.forEach(item => {
            const linkChars = item.querySelectorAll('.link-char');
            const pageNumber = item.querySelector('.page-number');
            const bgHover = item.querySelector('.bg-hover');
            const hoverGradient = item.querySelector('.hover-gradient');
            const underline = item.querySelector('.link-underline');
            const pageIndicator = item.querySelector('.page-indicator');
            
            item.addEventListener('mouseenter', () => {
                // Animate link characters
                gsap.to(linkChars, {
                    y: -5,
                    stagger: 0.03,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
                
                // Animate page number
                if (pageNumber && !item.classList.contains('active')) {
                    gsap.to(pageNumber, {
                        x: 10,
                        color: '#00ffea',
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
                
                // Animate underline
                if (underline) {
                    gsap.to(underline, {
                        width: '100%',
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
                
                // Animate gradient
                if (hoverGradient) {
                    gsap.to(hoverGradient, {
                        x: 0,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                }
                
                // Show page indicator
                if (pageIndicator) {
                    gsap.to(pageIndicator, {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
                
                // Text scramble effect for page number
                if (pageNumber && !item.classList.contains('active')) {
                    scrambleText(pageNumber);
                }
            });
            
            item.addEventListener('mouseleave', () => {
                // Reset link characters
                gsap.to(linkChars, {
                    y: 0,
                    stagger: 0.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // Reset page number if not active
                if (pageNumber && !item.classList.contains('active')) {
                    gsap.to(pageNumber, {
                        x: 0,
                        color: 'rgba(255, 255, 255, 0.4)',
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
                
                // Reset underline
                if (underline) {
                    gsap.to(underline, {
                        width: 0,
                        duration: 0.3,
                        ease: "power2.in"
                    });
                }
                
                // Reset gradient if not active
                if (hoverGradient && !item.classList.contains('active')) {
                    gsap.to(hoverGradient, {
                        x: '-100%',
                        duration: 0.4,
                        ease: "power2.in"
                    });
                }
                
                // Hide page indicator
                if (pageIndicator) {
                    gsap.to(pageIndicator, {
                        opacity: 0,
                        x: -10,
                        duration: 0.3,
                        ease: "power2.in"
                    });
                }
            });
        });
        
        // Text scramble animation
        function scrambleText(element) {
            const originalText = element.textContent;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let iteration = 0;
            const interval = 50;
            
            const scrambleInterval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        if (char === ' ') return ' ';
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iteration >= originalText.length) {
                    clearInterval(scrambleInterval);
                    setTimeout(() => {
                        element.textContent = originalText;
                    }, interval);
                }
                
                iteration += 1;
            }, interval);
        }
        
        // Sound toggle animation
        soundToggle.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isMuted = icon.classList.contains('fa-volume-mute');
            
            // Toggle icon
            if (isMuted) {
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-volume-up');
            } else {
                icon.classList.remove('fa-volume-up');
                icon.classList.add('fa-volume-mute');
            }
            
            // Bounce animation
            gsap.to(this, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
            
            // Ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: rgba(0, 255, 234, 0.2);
                transform: scale(0);
                pointer-events: none;
            `;
            this.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 1.5,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => ripple.remove()
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
            if (e.key === 'm' || e.key === 'M') {
                toggleMenu();
            }
        });
        
        // Initialize link characters position
        gsap.set('.link-char', { y: 100, opacity: 0 });
        gsap.set('.menu-item', { x: -50, opacity: 0 });
        gsap.set('.menu-top-title', { y: 20, opacity: 0 });
        gsap.set('.menu-bottom', { y: 20, opacity: 0 });
        gsap.set('.page-indicator', { opacity: 0, x: -10 });
        
        // Page load animations
        gsap.from('nav', {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.5
        });
        
        gsap.from('.menu-toggle', {
            scale: 0,
            rotation: -180,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.8
        });
        
        gsap.from('.nav-title', {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 1
        });
        
        // Initialize active item animation
        const activeItem = document.querySelector('.menu-item.active');
        if (activeItem) {
            const activeLinkChars = activeItem.querySelectorAll('.link-char');
            const activeUnderline = activeItem.querySelector('.link-underline');
            
            // Set active item initial state
            gsap.set(activeLinkChars, { y: 0, opacity: 1 });
            
            // Animate active underline on load
            if (activeUnderline) {
                setTimeout(() => {
                    gsap.to(activeUnderline, {
                        width: '100%',
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }, 1500);
            }
        }
        
        // Create floating particles
        function createParticles() {
            const particleCount = 30;
            const container = document.querySelector('.container');
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random position
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                
                // Random size
                const size = Math.random() * 2 + 1;
                
                // Apply styles
                particle.style.cssText = `
                    position: absolute;
                    left: ${x}vw;
                    top: ${y}vh;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(0, 255, 234, ${Math.random() * 0.3});
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                container.appendChild(particle);
                
                // Animate particle
                gsap.to(particle, {
                    x: `+=${(Math.random() - 0.5) * 100}`,
                    y: `+=${(Math.random() - 0.5) * 100}`,
                    opacity: 0,
                    duration: Math.random() * 3 + 2,
                    ease: "power1.out",
                    delay: Math.random() * 2,
                    onComplete: () => particle.remove()
                });
            }
        }
        
        // Create initial particles
        setTimeout(createParticles, 2000);
        
        // Create particles periodically
        setInterval(() => {
            if (isMenuOpen) {
                createParticles();
            }
        }, 3000);
    }
});