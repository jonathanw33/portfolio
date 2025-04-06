// Animated Hero Background
document.addEventListener('DOMContentLoaded', function() {
  // Create animated background for hero section
  createHeroBackground();
});

function createHeroBackground() {
  // Check if hero section exists
  const heroSection = document.getElementById('about');
  if (!heroSection) return;
  
  // Create canvas element for background animation
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-bg-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.5';
  
  // Insert canvas as first child
  if (heroSection.firstChild) {
    heroSection.insertBefore(canvas, heroSection.firstChild);
  } else {
    heroSection.appendChild(canvas);
  }
  
  // Get canvas context
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions
  function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  }
  
  // Particles array
  let particles = [];
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = getRandomColor();
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Boundary check
      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  // Create particles
  function createParticles() {
    particles = [];
    const particleCount = Math.min(100, Math.floor(canvas.width * canvas.height / 9000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  // Animate particles
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      // Connect particles
      connectParticles(particles[i]);
    }
    
    requestAnimationFrame(animate);
  }
  
  // Connect nearby particles
  function connectParticles(particle) {
    for (let i = 0; i < particles.length; i++) {
      const dx = particle.x - particles[i].x;
      const dy = particle.y - particles[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particle.color;
        ctx.globalAlpha = 1 - (distance / 100);
        ctx.lineWidth = 0.2;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particles[i].x, particles[i].y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
  
  // Get a semi-transparent color
  function getRandomColor() {
    const colors = [
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)'
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Initialize
  resizeCanvas();
  createParticles();
  animate();
  
  // Handle resize
  window.addEventListener('resize', function() {
    resizeCanvas();
    createParticles();
  });
}