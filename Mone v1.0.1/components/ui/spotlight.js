// Spotlight effect for portfolio items
class Spotlight {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      size: options.size || 300,
      className: options.className || 'spotlight-effect',
      fromColor: options.fromColor || 'rgba(255, 255, 255, 0.5)',
      viaColor: options.viaColor || 'rgba(255, 255, 255, 0.2)',
      toColor: options.toColor || 'rgba(255, 255, 255, 0.1)',
      blur: options.blur || '20px'
    };
    
    this.init();
  }
  
  init() {
    // Create spotlight element
    this.spotlightEl = document.createElement('div');
    this.spotlightEl.className = this.options.className;
    
    // Set styles for spotlight
    this.spotlightEl.style.position = 'absolute';
    this.spotlightEl.style.pointerEvents = 'none';
    this.spotlightEl.style.width = `${this.options.size}px`;
    this.spotlightEl.style.height = `${this.options.size}px`;
    this.spotlightEl.style.top = '0';
    this.spotlightEl.style.left = '0';
    this.spotlightEl.style.background = `radial-gradient(circle, ${this.options.fromColor} 0%, ${this.options.viaColor} 40%, ${this.options.toColor} 70%)`;
    this.spotlightEl.style.opacity = '0';
    this.spotlightEl.style.filter = `blur(${this.options.blur})`;
    this.spotlightEl.style.transform = 'translate(-50%, -50%)';
    this.spotlightEl.style.transition = 'opacity 0.3s ease';
    this.spotlightEl.style.zIndex = '1';
    
    // Make sure the container has position relative
    if (window.getComputedStyle(this.element).position === 'static') {
      this.element.style.position = 'relative';
    }
    
    // Add spotlight to element
    this.element.appendChild(this.spotlightEl);
    
    // Bind events
    this.boundMouseMove = this.handleMouseMove.bind(this);
    this.boundMouseEnter = this.handleMouseEnter.bind(this);
    this.boundMouseLeave = this.handleMouseLeave.bind(this);
    
    this.element.addEventListener('mousemove', this.boundMouseMove);
    this.element.addEventListener('mouseenter', this.boundMouseEnter);
    this.element.addEventListener('mouseleave', this.boundMouseLeave);
  }
  
  handleMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    requestAnimationFrame(() => {
      this.spotlightEl.style.left = `${x}px`;
      this.spotlightEl.style.top = `${y}px`;
    });
  }
  
  handleMouseEnter() {
    this.spotlightEl.style.opacity = '1';
  }
  
  handleMouseLeave() {
    this.spotlightEl.style.opacity = '0';
  }
  
  destroy() {
    this.element.removeEventListener('mousemove', this.boundMouseMove);
    this.element.removeEventListener('mouseenter', this.boundMouseEnter);
    this.element.removeEventListener('mouseleave', this.boundMouseLeave);
    this.element.removeChild(this.spotlightEl);
  }
}

// For global usage
window.Spotlight = Spotlight;