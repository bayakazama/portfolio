export function initCarouselAutoScroll() {
  const carousel = document.getElementById('carouselScroll');
  
  if (!carousel) return;
  
  let animationId: number | null = null;
  let isRunning = true;
  const scrollSpeed = 1; // pixels per frame
  const itemWidth = 408; // w-96 (384px) + gap-6 (24px)
  
  function autoScroll() {
    if (!isRunning) return;
    
    carousel.scrollLeft += scrollSpeed;
    
    // Calculate one-third of the scroll width (since content is tripled)
    const thirdOfScroll = (carousel.scrollWidth - carousel.clientWidth) / 3;
    
    // When reaching ~2/3 mark, seamlessly reset to beginning
    if (carousel.scrollLeft >= thirdOfScroll * 2) {
      // Disable smooth scrolling temporarily
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft = 0;
      // Re-enable smooth scrolling for manual interactions
      setTimeout(() => {
        carousel.style.scrollBehavior = 'smooth';
      }, 50);
    }
    
    animationId = requestAnimationFrame(autoScroll);
  }
  
  // Start after initial delay
  setTimeout(() => {
    animationId = requestAnimationFrame(autoScroll);
  }, 2000);
  
  // Pause on hover
  carousel.addEventListener('mouseenter', () => {
    isRunning = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
  
  carousel.addEventListener('mouseleave', () => {
    isRunning = true;
    animationId = requestAnimationFrame(autoScroll);
  });
}
