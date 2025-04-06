// Scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
});

function initScrollAnimations() {
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll('.service-box, .fancy-box, .portfolio-box');
  
  // Set initial state - invisible and offset
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });
  
  // Animate elements when they come into view
  function animateOnScroll() {
    const windowBottom = window.innerHeight + window.scrollY;
    
    animatedElements.forEach(element => {
      const elementMiddle = element.offsetTop + element.offsetHeight / 2;
      
      // Check if element is in viewport
      if (windowBottom > elementMiddle) {
        // Add staggered delay based on position in the DOM
        const index = Array.from(animatedElements).indexOf(element);
        const delay = index * 0.1; // 100ms delay for each element
        
        element.style.transitionDelay = `${delay}s`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
  
  // Trigger once on load
  setTimeout(animateOnScroll, 300);
  
  // Add parallax effect to hero avatar
  const heroAvatar = document.querySelector('.hero-avatar');
  if (heroAvatar) {
    window.addEventListener('scroll', function() {
      const scrollValue = window.scrollY;
      if (scrollValue < 500) { // Only apply for first 500px of scroll
        heroAvatar.style.transform = `translateY(${scrollValue * 0.1}px)`;
      }
    });
  }
  
  // Animate service section
  const serviceBoxes = document.querySelectorAll('.service-box');
  serviceBoxes.forEach((box, index) => {
    box.addEventListener('mouseenter', function() {
      // Highlight current box, dim others
      serviceBoxes.forEach((otherBox, otherIndex) => {
        if (index !== otherIndex) {
          otherBox.style.opacity = '0.6';
          otherBox.style.transform = 'scale(0.98)';
        }
      });
      
      // Enhance current box
      box.style.opacity = '1';
      box.style.transform = 'scale(1.02)';
    });
    
    box.addEventListener('mouseleave', function() {
      // Reset all boxes
      serviceBoxes.forEach(otherBox => {
        otherBox.style.opacity = '1';
        otherBox.style.transform = 'scale(1)';
      });
    });
  });
  
  // Add counting animation to experience numbers
  const counterElements = document.querySelectorAll('.fw-light.display-4');
  
  function animateCounter(element) {
    const target = parseFloat(element.textContent);
    let current = 0;
    const increment = target / 40; // Divide by number of frames
    
    function updateCount() {
      if (current < target) {
        current += increment;
        if (current > target) current = target;
        
        // Display with appropriate formatting
        if (Number.isInteger(target)) {
          element.textContent = Math.floor(current) + '+';
        } else {
          element.textContent = current.toFixed(1) + '+';
        }
        
        requestAnimationFrame(updateCount);
      }
    }
    
    updateCount();
  }
  
  // Intersection Observer for counter animation
  const options = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, options);
  
  counterElements.forEach(counter => {
    // Store original value and set to 0
    const originalValue = counter.textContent;
    counter.textContent = '0+';
    observer.observe(counter);
  });
}