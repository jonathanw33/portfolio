// Section Transitions and Reveal Effects
document.addEventListener('DOMContentLoaded', function() {
  initSectionTransitions();
});

function initSectionTransitions() {
  // Get all sections
  const sections = document.querySelectorAll('.section, .section-box');
  
  // Create Intersection Observer
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add class when section enters viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        
        // Animate section title if exists
        const sectionTitle = entry.target.querySelector('.display-3');
        if (sectionTitle) {
          sectionTitle.classList.add('title-animate');
        }
        
        // Animate section elements with staggered delay
        const elementsToAnimate = entry.target.querySelectorAll('.animate-on-visible');
        elementsToAnimate.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('element-visible');
          }, 100 * index);
        });
      }
    });
  }, {
    threshold: 0.2, // 20% of the section is visible
    rootMargin: '-50px'
  });
  
  // Observe each section
  sections.forEach(section => {
    // Add base classes for animation
    section.classList.add('section-transition');
    
    // Add animation classes to elements
    const elementsToAnimate = section.querySelectorAll('.service-box, .fancy-box, .portfolio-box, h1, h2, h3, p');
    elementsToAnimate.forEach(el => {
      el.classList.add('animate-on-visible');
    });
    
    // Start observing
    sectionObserver.observe(section);
  });
  
  // Add dramatic reveal animation to service section
  const serviceElements = document.querySelectorAll('.service-order, .service-title, .service-text');
  serviceElements.forEach(el => {
    el.classList.add('reveal-element');
  });
  
  // Add smooth navigation for section links
  initSmoothScrolling();
  
  // Add section progress indicator
  addSectionProgress();
}

// Smooth scrolling to sections
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Account for header
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add section progress indicator
function addSectionProgress() {
  // Create progress container
  const progressContainer = document.createElement('div');
  progressContainer.classList.add('section-progress');
  document.body.appendChild(progressContainer);
  
  // Get all sections
  const sections = document.querySelectorAll('.section, .section-box, #about');
  
  // Create progress dots
  sections.forEach((section, index) => {
    const dot = document.createElement('div');
    dot.classList.add('progress-dot');
    
    // Get section ID for data attribute
    const sectionId = section.id;
    if (sectionId) {
      dot.setAttribute('data-section', sectionId);
      
      // Add click event
      dot.addEventListener('click', () => {
        window.scrollTo({
          top: section.offsetTop - 70,
          behavior: 'smooth'
        });
      });
      
      progressContainer.appendChild(dot);
    }
  });
  
  // Update active dot on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section) => {
      const sectionId = section.id;
      if (!sectionId) return;
      
      const dot = document.querySelector(`.progress-dot[data-section="${sectionId}"]`);
      if (!dot) return;
      
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  });
}