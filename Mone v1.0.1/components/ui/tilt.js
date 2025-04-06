// Tilt effect for portfolio items
class Tilt {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      rotationFactor: options.rotationFactor || 15,
      isReverse: options.isReverse || false,
      transformOrigin: options.transformOrigin || 'center center',
      springOptions: options.springOptions || {
        stiffness: 26.7,
        damping: 4.1,
        mass: 0.2
      }
    };
    
    this.init();
  }
  
  init() {
    this.element.style.transition = 'transform 0.2s ease-out';
    this.element.style.transformStyle = 'preserve-3d';
    this.element.style.transformOrigin = this.options.transformOrigin;
    
    this.boundMouseMove = this.handleMouseMove.bind(this);
    this.boundMouseLeave = this.handleMouseLeave.bind(this);
    
    this.element.addEventListener('mousemove', this.boundMouseMove);
    this.element.addEventListener('mouseleave', this.boundMouseLeave);
  }
  
  handleMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPos = (mouseX / width - 0.5) * 2; // -1 to 1
    const yPos = (mouseY / height - 0.5) * 2; // -1 to 1
    
    const rotateX = this.options.isReverse ? 
      yPos * this.options.rotationFactor : 
      -yPos * this.options.rotationFactor;
      
    const rotateY = this.options.isReverse ? 
      -xPos * this.options.rotationFactor : 
      xPos * this.options.rotationFactor;
    
    requestAnimationFrame(() => {
      this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }
  
  handleMouseLeave() {
    requestAnimationFrame(() => {
      this.element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }
  
  destroy() {
    this.element.removeEventListener('mousemove', this.boundMouseMove);
    this.element.removeEventListener('mouseleave', this.boundMouseLeave);
    this.element.style.transform = '';
    this.element.style.transition = '';
    this.element.style.transformStyle = '';
  }
}

// For global usage
window.Tilt = Tilt;