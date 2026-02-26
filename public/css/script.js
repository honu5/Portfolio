document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
    const typingTextElement = document.getElementById('typing-text');
    const roles = ["FullStack Developer</>", "AI Engineer</>", "Data Scripter</>", "Competitive Programmer</>", "Believer</>"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 70; 
    const deletingSpeed = 40; 
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

    if (typingTextElement) {
        type();
    }

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const sidebar = document.getElementById('sidebar');

    // Sidebar toggle for small screens
    if (burger && sidebar) {
        burger.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-active');
            burger.classList.toggle('toggle');
        });

        // Close sidebar when a link is clicked
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (sidebar.classList.contains('sidebar-active')) {
                    sidebar.classList.remove('sidebar-active');
                    burger.classList.remove('toggle');
                }
            });
        });

        document.addEventListener('click', (event) => {
            const clickedInsideSidebar = sidebar.contains(event.target);
            const clickedBurger = burger.contains(event.target);

            if (!clickedInsideSidebar && !clickedBurger && sidebar.classList.contains('sidebar-active')) {
                sidebar.classList.remove('sidebar-active');
                burger.classList.remove('toggle');
            }
        });
    }
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const navHeight = header ? header.offsetHeight : 0;

    // Close mobile nav when a link is clicked
    if (navLinks && burger) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            });
        });
    }

   
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.id === 'darkModeToggle') {
                return; 
            }

            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return;
            }

            e.preventDefault();
            const targetId = href.substring(1);
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

        if (navLinks) {
            navLinks.querySelectorAll('a').forEach(link => {
                if (link.id !== 'darkModeToggle') {
                    link.classList.remove('active');
                    if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                }
            });
        }
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
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            // Save preference to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

});


  function animateCount(el) {
    const start = +el.dataset.start;
        const end = +el.dataset.end;
    let current = start;

    const update = () => {
      if (current < end) {
        current++;
        el.textContent = current + "+";
        setTimeout(update, 100);
      } else {
        el.textContent = end + "+";
      }
    };

    update();
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const countEls = entry.target.querySelectorAll(".count");
        countEls.forEach(el => animateCount(el));
        observer.unobserve(entry.target); // count only once
      }
    });
  }, {
    threshold: 0.5 // Adjust if needed
  });

  const statsSection = document.querySelector("#stats-section");
  if (statsSection) observer.observe(statsSection);

