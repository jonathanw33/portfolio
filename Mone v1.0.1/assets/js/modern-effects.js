// Modern Effects Initialization

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Tilt and Spotlight effects on portfolio items
  initPortfolioEffects();
  
  // Initialize skill progress bars
  initSkillProgress();
  
  // Initialize scroll animations
  initScrollAnimations();
});

// Portfolio Effects
function initPortfolioEffects() {
  // Get all portfolio boxes
  const portfolioBoxes = document.querySelectorAll('.portfolio-box');
  
  // Initialize TiltSpotlight on each portfolio box
  portfolioBoxes.forEach(box => {
    // Add tilt-container class
    box.classList.add('tilt-container');
    
    // Get the image container
    const imageContainer = box.querySelector('.portfolio-img');
    
    if (imageContainer) {
      // Create a new TiltSpotlight instance
      new TiltSpotlight(imageContainer, {
        rotationFactor: 6,
        isReverse: true,
        spotlightSize: 248,
        fromColor: 'rgba(255, 255, 255, 0.5)',
        viaColor: 'rgba(255, 255, 255, 0.2)', 
        toColor: 'rgba(255, 255, 255, 0.1)',
        blur: '20px'
      });
      
      // Add hover effect class to the box
      box.classList.add('card-hover');
      
      // Add image-hover class to the image
      const img = imageContainer.querySelector('img');
      if (img) {
        img.classList.add('image-hover');
      }
    }
  });
}

// Skill Progress Bars
function initSkillProgress() {
  // Get all skill items
  const skillItems = document.querySelectorAll('.skill-item');
  
  // Initialize progress bars for each skill
  skillItems.forEach(item => {
    // Get the skill name
    const skillName = item.textContent.trim();
    
    // Create progress container
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('skill-progress-container');
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('skill-progress-bar');
    
    // Set width based on skill
    let width = 85; // Default
    
    if (skillName.includes('Web Development')) {
      width = 90;
    } else if (skillName.includes('System Analysis')) {
      width = 95;
    } else if (skillName.includes('Project Management')) {
      width = 85;
    } else if (skillName.includes('Data Analytics')) {
      width = 80;
    } else if (skillName.includes('UML Modeling')) {
      width = 90;
    }
    
    // Add to DOM
    progressContainer.appendChild(progressBar);
    item.appendChild(progressContainer);
    
    // Animate progress after a delay
    setTimeout(() => {
      progressBar.style.width = `${width}%`;
    }, 300);
  });
}

// Scroll Animations
function initScrollAnimations() {
  // Create scroll indicator for hero section
  const heroSection = document.getElementById('about');
  
  if (heroSection) {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    scrollIndicator.innerHTML = `
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <p class="mt-2">Scroll Down</p>
    `;
    
    heroSection.appendChild(scrollIndicator);
  }
  
  // Animate hero text
  const heroHeading = document.querySelector('.hero-heading');
  if (heroHeading) {
    heroHeading.classList.add('animate-text-gradient');
  }
  
  // Add floating animation to avatar
  const heroAvatar = document.querySelector('.hero-avatar');
  if (heroAvatar) {
    heroAvatar.classList.add('float');
  }
  
  // Add parallax effect to sections
  initParallaxEffect();
  
  // Animate elements on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.service-box, .fancy-box, .portfolio-box');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial states
  document.querySelectorAll('.service-box, .fancy-box, .portfolio-box').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
  
  // Trigger once on load
  animateOnScroll();
  
  // Add staggered animation to portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-box');
  portfolioItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });
}

// Parallax Effect
function initParallaxEffect() {
  // Add parallax effect to sections
  const sections = document.querySelectorAll('.section, .section-box');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    sections.forEach((section, index) => {
      const speed = 0.05; // Parallax speed
      const yPos = -(scrollY * speed * (index % 2 === 0 ? 1 : -1));
      
      // Apply subtle parallax
      section.style.backgroundPosition = `center ${yPos}px`;
    });
  });
  
  // Add dynamic section backgrounds
  sections.forEach((section, index) => {
    // Only add to sections without explicit backgrounds
    if (!section.style.backgroundImage) {
      section.style.position = 'relative';
      section.style.overflow = 'hidden';
      
      // Create subtle background pattern
      const patternOverlay = document.createElement('div');
      patternOverlay.classList.add('pattern-overlay');
      patternOverlay.style.opacity = '0.03';
      patternOverlay.style.position = 'absolute';
      patternOverlay.style.top = '0';
      patternOverlay.style.left = '0';
      patternOverlay.style.width = '100%';
      patternOverlay.style.height = '100%';
      patternOverlay.style.zIndex = '-1';
      patternOverlay.style.backgroundSize = '20px 20px';
      
      // Alternate patterns
      if (index % 3 === 0) {
        patternOverlay.style.backgroundImage = 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)';
      } else if (index % 3 === 1) {
        patternOverlay.style.backgroundImage = 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)';
      } else {
        patternOverlay.style.backgroundImage = 'linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)';
        patternOverlay.style.backgroundSize = '20px 20px';
      }
      
      section.prepend(patternOverlay);
    }
  });
}