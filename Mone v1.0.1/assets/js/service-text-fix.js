// Make sure service texts are visible by default
document.addEventListener('DOMContentLoaded', function() {
  // Get all service text elements
  const serviceTexts = document.querySelectorAll('.service-text');
  const serviceOrders = document.querySelectorAll('.service-order');
  const serviceTitles = document.querySelectorAll('.service-title');
  
  // Make sure they're visible by default
  serviceTexts.forEach(text => {
    text.style.opacity = '1';
    text.style.transform = 'translateY(0)';
  });
  
  serviceOrders.forEach(order => {
    order.style.opacity = '1';
    order.style.transform = 'translateY(0)';
  });
  
  serviceTitles.forEach(title => {
    title.style.opacity = '1';
    title.style.transform = 'translateY(0)';
  });
});