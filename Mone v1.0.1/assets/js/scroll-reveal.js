// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
  initScrollReveal();
});

function initScrollReveal() {
  // Elements to reveal on scroll
  const revealElements = [
    // Hero section elements
    { selector: '.hero-heading', delay: 0, origin: 'bottom', distance: '50px', duration: 800 },
    { selector: '.hero-avatar', delay: 200, origin: 'bottom', distance: '30px', duration: 1000 },
    
    // About section elements
    { selector: '.sm-heading', delay: 100, origin: 'left', distance: '20px', duration: 600, interval: 100 },
    { selector: '.list-inline-dot', delay: 300, origin: 'bottom', distance: '20px', duration: 800 },
    { selector: '.list-inline', delay: 400, origin: 'bottom', distance: '20px', duration: 800 },
    { selector: '.fw-light.display-4', delay: 200, origin: 'right', distance: '30px', duration: 800, interval: 150 },
    
    // Services section
    { selector: '.service-box', delay: 100, origin: 'bottom', distance: '50px', duration: 800, interval: 200 },
    
    // Portfolio section
    { selector: '.portfolio-box', delay: 100, origin: 'bottom', distance: '30px', duration: 800, interval: 150 },
    
    // Awards section
    { selector: '.fancy-box', delay: 100, origin: 'bottom', distance: '30px', duration: 800, interval: 150 },
    
    // Contact section
    { selector: '.mt-5.border-radius-1', delay: 300, origin: 'bottom', distance: '50px', duration: 1000 }
  ];
  
  // Initialize reveal for each element group
  revealElements.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    
    if (elements.length) {
      // Apply initial styles
      elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = getTransform(item.origin, item.distance);
        
        // Calculate delay with interval for multiple elements
        const elementDelay = item.interval ? item.delay + (index * item.interval) : item.delay;
        el.style.transitionDelay = `${elementDelay}ms`;
        
        // Add transition
        el.style.transition = `opacity ${item.duration}ms ease, transform ${item.duration}ms ease`;
      });
      
      // Create observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translate3d(0, 0, 0)';
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      });
      
      // Observe each element
      elements.forEach(el => {
        observer.observe(el);
      });
    }
  });
  
  // Helper function to get transform based on origin
  function getTransform(origin, distance) {
    switch(origin) {
      case 'top':
        return `translate3d(0, -${distance}, 0)`;
      case 'bottom':
        return `translate3d(0, ${distance}, 0)`;
      case 'left':
        return `translate3d(-${distance}, 0, 0)`;
      case 'right':
        return `translate3d(${distance}, 0, 0)`;
      default:
        return `translate3d(0, ${distance}, 0)`;
    }
  }
  
  // Add text splitting for hero heading
  const heroHeading = document.querySelector('.hero-heading');
  if (heroHeading) {
    // Store original text
    const originalText = heroHeading.textContent;
    // Set data attribute for after pseudo element
    heroHeading.setAttribute('data-text', originalText);
    
    // Clear and create letter spans
    heroHeading.innerHTML = '';
    
    for (let i = 0; i < originalText.length; i++) {
      const letter = document.createElement('span');
      letter.className = 'letter';
      letter.style.display = 'inline-block';
      letter.style.opacity = '0';
      letter.style.transform = 'translateY(20px)';
      letter.style.transition = `opacity 0.3s ease, transform 0.3s ease`;
      letter.style.transitionDelay = `${i * 50}ms`;
      letter.textContent = originalText[i];
      
      heroHeading.appendChild(letter);
    }
    
    // Trigger animation after a short delay
    setTimeout(() => {
      const letters = heroHeading.querySelectorAll('.letter');
      letters.forEach(letter => {
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0)';
      });
    }, 300);
  }
}