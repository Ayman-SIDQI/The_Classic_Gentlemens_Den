// scroll.js
export function handleScroll() {
  const canvas = document.querySelector('#bg');
  const hero = document.querySelector('#hero');
  const heroBottom = hero.offsetTop + hero.offsetHeight;
  const scrollIndicator = createScrollIndicator();
  hero.appendChild(scrollIndicator);

  window.addEventListener('scroll', () => {
    if (window.scrollY > heroBottom) {
      canvas.style.opacity = '0';
      scrollIndicator.style.opacity = '0';
    } else {
      canvas.style.opacity = '1';
      scrollIndicator.style.opacity = 1 - (window.scrollY / heroBottom);
    }
  });
}

function createScrollIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'scroll-indicator';
  
  const text = document.createElement('span');
  text.textContent = 'Scroll to Book';
  text.className = 'neon-text';
  
  const arrow = document.createElement('div');
  arrow.className = 'scroll-arrow';
  arrow.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  `;
  
  indicator.appendChild(text);
  indicator.appendChild(arrow);
  
  const style = document.createElement('style');
  style.textContent = `
    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      transition: opacity 0.3s ease;
      z-index: 10;
      font-family: Arial, sans-serif;
    }

    .neon-text {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #fff;
      text-shadow: 0 0 5px #fff,
                   0 0 10px #fff,
                   0 0 15px #FFEE88,
                   0 0 20px #FFEE88;
      animation: neon 1.5s ease-in-out infinite alternate;
    }

    @keyframes neon {
      from {
        text-shadow: 0 0 5px #fff,
                     0 0 10px #fff,
                     0 0 15px #FFEE88,
                     0 0 20px #FFEE88;
      }
      to {
        text-shadow: 0 0 2.5px #fff,
                     0 0 5px #fff,
                     0 0 7.5px #FFEE88,
                     0 0 10px #FFEE88;
      }
    }

    .scroll-arrow {
      animation: bounce 1s infinite;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(10px);
      }
    }
  `;
  document.head.appendChild(style);
  
  return indicator;
}