/**
 * Library Module
 * Handles the dictionary-style sign language library functionality
 */

import { signLibrary } from './data.js';

export function initLibrary() {
  console.log('Initializing Library Module');
  
  // Create alphabet navigation
  createAlphabetNav();
  
  // Set up search functionality
  setupSearch();
  
  // Default to 'A' when library is first loaded
  displayLetterSigns('A');
}

/**
 * Creates the alphabet navigation buttons
 */
function createAlphabetNav() {
  const alphabetNav = document.querySelector('.alphabet-nav');
  
  // Clear any existing content
  alphabetNav.innerHTML = '';
  
  // Get available letters from the sign library
  const availableLetters = Object.keys(signLibrary);
  
  // Create all alphabet buttons A-Z
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement('button');
    button.textContent = letter;
    
    // If we have signs for this letter, make it clickable
    if (availableLetters.includes(letter)) {
      button.addEventListener('click', () => displayLetterSigns(letter));
    } else {
      button.disabled = true;
      button.style.opacity = '0.5';
    }
    
    alphabetNav.appendChild(button);
  }
}

/**
 * Displays signs for the selected letter
 * @param {string} letter - The selected letter
 */
function displayLetterSigns(letter) {
  console.log(`Displaying signs for letter: ${letter}`);
  
  // Update active state in navigation
  const alphabetButtons = document.querySelectorAll('.alphabet-nav button');
  alphabetButtons.forEach(btn => {
    if (btn.textContent === letter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update letter display
  const letterDisplay = document.getElementById('letter-display');
  letterDisplay.textContent = letter;
  
  // Get signs for this letter
  const signs = signLibrary[letter] || [];
  
  // Update sign list
  const signList = document.getElementById('sign-list');
  
  if (signs.length === 0) {
    signList.innerHTML = `
      <div class="empty-state">
        <h3>No signs available</h3>
        <p>There are no sign language entries for the letter ${letter} yet.</p>
      </div>
    `;
    return;
  }
  
  // Generate sign cards
  signList.innerHTML = signs.map(sign => `
    <div class="sign-card" data-word="${sign.word.toLowerCase()}">
      <img class="sign-image" src="${sign.image}" alt="${sign.word} sign" loading="lazy">
      <h3 class="sign-word">${sign.word}</h3>
      <p class="sign-description">${sign.description}</p>
    </div>
  `).join('');
  
  // Add click event to sign cards to show details (could be expanded later)
  document.querySelectorAll('.sign-card').forEach(card => {
    card.addEventListener('click', () => {
      const word = card.getAttribute('data-word');
      console.log(`Clicked on sign: ${word}`);
      // Could show a modal with more details, video, etc.
    });
  });
}

/**
 * Sets up the search functionality for the library
 */
function setupSearch() {
  const searchInput = document.getElementById('library-search');
  const searchButton = document.getElementById('library-search-btn');
  
  // Search when button is clicked
  searchButton.addEventListener('click', () => performSearch());
  
  // Search when Enter key is pressed
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

/**
 * Performs search based on input value
 */
function performSearch() {
  const searchInput = document.getElementById('library-search');
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  if (searchTerm === '') return;
  
  console.log(`Searching for: ${searchTerm}`);
  
  // Search through all letters for matching words
  let found = false;
  let firstLetter = '';
  
  // Loop through each letter in the library
  for (const letter in signLibrary) {
    const matchingSigns = signLibrary[letter].filter(sign => 
      sign.word.toLowerCase().includes(searchTerm)
    );
    
    if (matchingSigns.length > 0 && !found) {
      // If we find matches, display that letter
      found = true;
      firstLetter = letter;
      
      // Display the letter's signs
      displayLetterSigns(letter);
      
      // Highlight matching cards
      setTimeout(() => {
        document.querySelectorAll('.sign-card').forEach(card => {
          const word = card.getAttribute('data-word');
          if (word.includes(searchTerm)) {
            card.classList.add('highlight');
            // Scroll the first match into view
            if (word === matchingSigns[0].word.toLowerCase()) {
              card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        });
      }, 100);
    }
  }
  
  // If no matches were found
  if (!found) {
    const signList = document.getElementById('sign-list');
    const letterDisplay = document.getElementById('letter-display');
    
    letterDisplay.textContent = '🔍';
    signList.innerHTML = `
      <div class="empty-state">
        <h3>No matches found</h3>
        <p>No signs matching "${searchTerm}" were found in our library.</p>
      </div>
    `;
    
    // Reset active state in navigation
    const alphabetButtons = document.querySelectorAll('.alphabet-nav button');
    alphabetButtons.forEach(btn => btn.classList.remove('active'));
  }
}