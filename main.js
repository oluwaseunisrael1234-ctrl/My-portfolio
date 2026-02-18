// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const currentYear = document.getElementById('currentYear');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize form validation if form exists
    if (contactForm) {
        initFormValidation();
    }
    
    // Initialize skill bars if they exist
    initSkillBars();
    
    // Initialize project filter if it exists
    initProjectFilter();
    
    // Initialize FAQ accordion if it exists
    initFAQAccordion();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize animations
    initAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    if (!mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Toggle body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
            document.body.style.overflow = '';
        }
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'var(--shadow)';
    }
});

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = `${width}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Project Filter
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) return;
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
}

function initFormValidation() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form elements
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const company = document.getElementById('company');
        const subject = document.getElementById('subject');
        const projectType = document.getElementById('project-type');
        const budget = document.getElementById('budget');
        const message = document.getElementById('message');
        const newsletter = document.getElementById('newsletter');

        // Reset error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });

        // Reset field borders
        [name, email, subject, projectType, message].forEach(field => {
            if (field) field.style.borderColor = '';
        });

        let isValid = true;

        // Validate fields
        if (name.value.trim() === '') {
            showError(name, 'nameError', 'Please enter your name');
            isValid = false;
        }

        const emailValue = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '') {
            showError(email, 'emailError', 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            showError(email, 'emailError', 'Please enter a valid email address');
            isValid = false;
        }

        if (subject.value.trim() === '') {
            showError(subject, 'subjectError', 'Please enter a subject');
            isValid = false;
        }

        if (projectType.value === '') {
            showError(projectType, 'projectTypeError', 'Please select a project type');
            isValid = false;
        }

        if (message.value.trim() === '') {
            showError(message, 'messageError', 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'messageError', 'Message must be at least 10 characters');
            isValid = false;
        }

        // Helper for error display
        function showError(field, errorId, message) {
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
            if (field) field.style.borderColor = 'var(--error)';
        }

        // If form is valid, send all details to WhatsApp
        if (isValid) {
            const whatsappMessage = `
Hello! EazyTech i would love you to build a website for me:

Full Name: ${name.value.trim()}
Email: ${email.value.trim()}
Company: ${company.value.trim() || 'N/A'}
Subject: ${subject.value.trim()}
Project Type: ${projectType.value}
Budget: ${budget.value || 'N/A'}
Message: ${message.value.trim()}
Subscribe to newsletter: ${newsletter.checked ? 'Yes' : 'No'}
`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
           const phoneNumber = "2348132030245";

            // Open WhatsApp with the message
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

            // Optional: show success message locally
            if (formSuccess) {
                formSuccess.style.display = 'flex';
                contactForm.reset();
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        }
    });

    
    // Helper function to show error messages
    function showError(field, errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        if (field) {
            field.style.borderColor = 'var(--error)';
        }
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or links to a different page
            if (href === '#' || href.includes('.html')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.project-card, .service-card, .process-step, .featured-item').forEach(el => {
        observer.observe(el);
    });
}

// Page-specific initializations
if (window.location.pathname.includes('projects.html')) {
    // Projects page specific initialization
    document.addEventListener('DOMContentLoaded', function() {
        // Add click animations to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Only trigger if not clicking on a button
                if (!e.target.closest('.btn')) {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                }
            });
        });
    });
}

/// Add CSS for animations
const style = document.createElement("style");

style.textContent = `
  .animate-in {
    animation: fadeIn 0.6s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .project-card,
  .service-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }

  .project-card.animate-in,
  .service-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

document.head.appendChild(style);

document.head.appendChild(style);

// Initialize on page load
window.addEventListener('load', function() {
    // Trigger animations for elements already in view
    document.querySelectorAll('.project-card, .service-card, .process-step, .featured-item').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('animate-in');
        }
    });
});