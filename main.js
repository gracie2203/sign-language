/**
 * Main JavaScript file for Signbridge application
 * Handles navigation and initializes all modules
 */

import { initLibrary } from './library.js';
import { initTranslator } from './translator.js';
import { initAlbum } from './album.js';

// Initialize main functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Signbridge application initialized');
  
  // Setup navigation
  setupNavigation();
  
  // Setup mobile menu toggle
  setupMobileMenu();
  
  // Initialize all feature modules
  initFeatureModules();
});

/**
 * Sets up the main navigation
 */
function setupNavigation() {
  const navLinks = document.querySelectorAll('#main-nav a');
  const featureButtons = document.querySelectorAll('.navigate-btn');
  
  // Handle main navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      navigateToSection(section);
    });
  });
  
  // Handle feature card buttons on home page
  featureButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const section = button.getAttribute('data-section');
      navigateToSection(section);
    });
  });
}

/**
 
 * @param {string} sectionId 
 */
function navigateToSection(sectionId) {
  console.log(`Navigating to section: ${sectionId}`);
  

  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  const navLinks = document.querySelectorAll('#main-nav a');
  navLinks.forEach(link => {
    const linkSection = link.getAttribute('data-section');
    if (linkSection === sectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  

  const navList = document.getElementById('main-nav');
  navList.classList.remove('show');
  
 
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


function setupMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('main-nav');
  
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
  });
  
  
  document.addEventListener('click', (e) => {
    const isMenuToggle = e.target.closest('#menu-toggle');
    const isNavList = e.target.closest('#main-nav');
    
    if (!isMenuToggle && !isNavList) {
      navList.classList.remove('show');
    }
  });
}

/**
 * Initializes all feature modules
 */
function initFeatureModules() {
  // Initialize the library module
  initLibrary();
  
  // Initialize the translator module
  initTranslator();
  
  // Initialize the album module
  initAlbum();

   const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.location.href = 'logout.php';
    });
  }
}