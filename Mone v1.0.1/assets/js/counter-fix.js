// Direct counter fix - force display of correct values
document.addEventListener('DOMContentLoaded', function() {
  // Immediately set correct values
  setCorrectValues();
  
  // Set them again after a slight delay to override any animations
  setTimeout(setCorrectValues, 100);
  setTimeout(setCorrectValues, 500);
  setTimeout(setCorrectValues, 1000);
  
  // Also set them when scrolling (in case animations trigger on scroll)
  window.addEventListener('scroll', setCorrectValues);

  function setCorrectValues() {
    // Get all counter elements
    const counterElements = document.querySelectorAll('.fw-light.display-4');
    
    // First counter - Projects Done: 6+
    if (counterElements[0]) {
      counterElements[0].textContent = '6+';
      counterElements[0].setAttribute('data-fixed', 'true');
    }
    
    // Second counter - Years of Experience: 1+
    if (counterElements[1]) {
      counterElements[1].textContent = '1+';
      counterElements[1].setAttribute('data-fixed', 'true');
    }
    
    // Third counter - Education: ITB
    if (counterElements[2]) {
      counterElements[2].textContent = 'ITB';
      counterElements[2].setAttribute('data-fixed', 'true');
    }
  }
  
  // Completely disable the original counter animation by redefining the IntersectionObserver
  if (window.IntersectionObserver) {
    const originalObserve = IntersectionObserver.prototype.observe;
    
    // Override the observe method to prevent observation of our fixed counters
    IntersectionObserver.prototype.observe = function(target) {
      if (target.classList.contains('fw-light') && 
          target.classList.contains('display-4') &&
          target.getAttribute('data-fixed') === 'true') {
        // Don't observe our fixed counters
        return;
      }
      
      // Call the original method for other elements
      return originalObserve.apply(this, arguments);
    };
  }
});

// Force immediate execution - just to be sure
(function immediateExecution() {
  const counterElements = document.querySelectorAll('.fw-light.display-4');
  
  // Set correct values immediately
  if (counterElements[0]) counterElements[0].textContent = '6+';
  if (counterElements[1]) counterElements[1].textContent = '1+';
  if (counterElements[2]) counterElements[2].textContent = 'ITB';
})();