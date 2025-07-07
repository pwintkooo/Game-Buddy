/**
 * GameBuddy Interactive Features
 * Handles navigation, animations, and chatbot interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize all app functionality
 */
function initializeApp() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeChatbotAnimation();
    initializeButtonActions();
    initializePageTransitions();
}

/**
 * Navigation functionality
 */
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            }
        }
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background blur effect when scrolled
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Scroll reveal animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
        
        // Add delay if specified
        const delay = element.getAttribute('data-aos-delay');
        if (delay) {
            element.style.transitionDelay = delay + 'ms';
        }
    });

    // Stagger animations for grid items
    const featureCards = document.querySelectorAll('.feature-card');
    const toolCards = document.querySelectorAll('.tool-card');
    
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 100) + 'ms';
    });
    
    toolCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 100) + 'ms';
    });
}

/**
 * Chatbot animation and interactions
 */
function initializeChatbotAnimation() {
    const typingText = document.getElementById('typing-text');
    const chatbotPreview = document.getElementById('chatbot-preview');
    
    if (typingText) {
        // Typing animation for chatbot message
        const messages = [
            "Hi! I'm your GameBuddy AI. What type of gaming experience are you looking for today?",
            "Looking for something quick and casual, or an epic adventure?",
            "Want to play solo or with friends?",
            "Tell me about your favorite games and I'll find similar ones!"
        ];
        
        let currentMessageIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentMessage = messages[currentMessageIndex];
            
            if (isDeleting) {
                typingText.textContent = currentMessage.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typingText.textContent = currentMessage.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentCharIndex === currentMessage.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                typeSpeed = 500; // Pause before next message
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add hover effects to chatbot preview
    if (chatbotPreview) {
        chatbotPreview.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
        });
        
        chatbotPreview.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    }
}

/**
 * Button actions and interactions
 */
function initializeButtonActions() {
    const startChatBtn = document.getElementById('start-chat');
    const learnMoreBtn = document.getElementById('learn-more');
    
    if (startChatBtn) {
        startChatBtn.addEventListener('click', function() {
            // Smooth scroll to discovery tools section
            const discoverySection = document.getElementById('discovery-tools');
            if (discoverySection) {
                discoverySection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Smooth scroll to features section
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    // Add click animations to all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Tool card interactions
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 100);
        });
    });
}

/**
 * Page transitions and loading states
 */
function initializePageTransitions() {
    // Add loading animation for page navigation
    const internalLinks = document.querySelectorAll('a[href^="pages/"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Add fade out effect
            document.body.style.opacity = '0.8';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 200);
        });
    });
    
    // Fade in animation on page load
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });
}

/**
 * Utility functions
 */

// Smooth scroll polyfill for older browsers
function smoothScrollTo(element) {
    const targetPosition = element.offsetTop - 100; // Account for fixed navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add ripple effect CSS dynamically
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add CSS to head
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Console welcome message
console.log(`
🎮 Welcome to GameBuddy! 
🤖 AI-powered game discovery is loading...
🚀 Ready to find your next favorite game?
`);
