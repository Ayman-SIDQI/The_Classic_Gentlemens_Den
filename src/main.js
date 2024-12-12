import './styles/index.css';
import './styles/base.css'
import './styles/sections.css'
import { initScene } from './scene.js';
import { handleFormSubmission } from './components/form.js';
import { handleScroll } from './utils/scroll.js';
import { handleViewport } from './utils/viewport.js';

// Initialize viewport handler
const viewport = handleViewport();
viewport.init();

// Initialize Three.js scene
initScene();

// Initialize scroll handler
handleScroll();

// Form handling
const form = document.getElementById('appointment-form');
form.addEventListener('submit', handleFormSubmission);