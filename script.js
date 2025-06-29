document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
    const typingTextElement = document.getElementById('typing-text');
    const roles = ["Web Developer</>", "Competitive Programmer</>", "Believer-Evangelist</>"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; 
    const deletingSpeed = 60; 
    const delayBeforeTyping = 300;  
    const delayBeforeDeleting = 1500; 

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentSpeed = delayBeforeDeleting;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentSpeed = delayBeforeTyping;
        }

        setTimeout(type, currentSpeed);
    }

    type();

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    const navHeight = document.querySelector('header').offsetHeight;

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) { 
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

   
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            if (this.id === 'darkModeToggle') {
                return; 
            }
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - navHeight && pageYOffset < sectionTop + sectionHeight - navHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            if (link.id !== 'darkModeToggle') {
                link.classList.remove('active');
                if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); 
            } else {
                entry.target.classList.remove('fade-in'); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = 0; // Hide initially
        title.style.transform = 'translateY(20px)'; // Prepare for animation
        title.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(title);
    });

    
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);


    
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; 
        
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; 
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Save preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; 
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
        }
    });

});