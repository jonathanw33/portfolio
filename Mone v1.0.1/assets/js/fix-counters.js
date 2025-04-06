// Fix counters by directly setting their values
(function() {
  // Run immediately
  setCorrectCounters();
  
  // Run again when DOM is loaded (to be sure)
  document.addEventListener('DOMContentLoaded', setCorrectCounters);
  
  // Run again after a short delay (in case other scripts modify them)
  setTimeout(setCorrectCounters, 500);
  setTimeout(setCorrectCounters, 1000);
  setTimeout(setCorrectCounters, 2000);
  
  // Also run on scroll and window load just to be absolutely sure
  window.addEventListener('scroll', setCorrectCounters);
  window.addEventListener('load', setCorrectCounters);
  
  function setCorrectCounters() {
    const counters = document.querySelectorAll('.fw-light.display-4');
    
    // Force the correct values
    if (counters[0]) counters[0].innerHTML = '6+';
    if (counters[1]) counters[1].innerHTML = '1+';
    if (counters[2]) counters[2].innerHTML = 'ITB';
    
    // Remove any observer that might be watching these elements
    if (window.IntersectionObserver) {
      counters.forEach(counter => {
        counter.setAttribute('data-no-animate', 'true');
      });
    }
  }
})();