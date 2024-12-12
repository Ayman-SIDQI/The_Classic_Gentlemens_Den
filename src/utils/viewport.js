export function handleViewport() {
  return {
    setViewportHeight: () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    
    init: function() {
      this.setViewportHeight();
      window.addEventListener('resize', this.setViewportHeight);
    }
  };
}