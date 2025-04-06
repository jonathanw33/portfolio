// Combined Tilt and Spotlight for portfolio items
class TiltSpotlight {
  constructor(element, options = {}) {
    this.element = element;
    
    // Default options
    this.options = {
      tilt: {
        rotationFactor: options.rotationFactor || 6,
        isReverse: options.isReverse || true,
        transformOrigin: options.transformOrigin || 'center center',
        springOptions: options.springOptions || {
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2
        }
      },
      spotlight: {
        size: options.spotlightSize || 248,
        fromColor: options.fromColor || 'rgba(255, 255, 255, 0.5)',
        viaColor: options.viaColor || 'rgba(255, 255, 255, 0.2)',
        toColor: options.toColor || 'rgba(255, 255, 255, 0.1)',
        blur: options.blur || '20px'
      }
    };
    
    // Initialize components
    this.tilt = new Tilt(element, this.options.tilt);
    this.spotlight = new Spotlight(element, this.options.spotlight);
    
    // Add subtle hover effect for image - just a gentle scale with no grayscale
    const img = element.querySelector('img');
    if (img) {
      img.classList.add('duration-700');
      element.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.03)';
      });
      element.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
      
      // Set transition for scale effect
      img.style.transition = 'transform 0.7s ease';
    }
  }
  
  destroy() {
    this.tilt.destroy();
    this.spotlight.destroy();
    
    const img = this.element.querySelector('img');
    if (img) {
      img.style.transform = '';
      img.style.transition = '';
    }
  }
}

// For global usage
window.TiltSpotlight = TiltSpotlight;