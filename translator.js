
import { translationDictionary, fingerspellingAlphabet } from './data.js';

export function initTranslator() {
  console.log('Initializing Translator Module');
  

  const translateBtn = document.getElementById('translate-btn');
  translateBtn.addEventListener('click', translateText);
  

  const textInput = document.getElementById('text-to-translate');
  textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      translateText();
    }
  });
  

  showEmptyState();
}


function translateText() {
  const textInput = document.getElementById('text-to-translate');
  const text = textInput.value.trim().toLowerCase(); 
  if (text === '') {
    showEmptyState();
    return;
  }

  console.log(`Translating: ${text}`);

  // Show loading state
  showLoadingState();

  setTimeout(() => {
    const translationResult = document.querySelector('.translation-result');
    translationResult.classList.add('has-content');
    translationResult.innerHTML = `<div class="translation-container"></div>`;
    const container = translationResult.querySelector('.translation-container');

    // FIRST: Check if the ENTIRE PHRASE exists in the dictionary (e.g., "my name is")
    if (translationDictionary[text]) {
      const translation = translationDictionary[text];
      container.appendChild(createTranslationItem(text, translation.image));
      return; // Skip word-by-word if phrase matched
    }

    // SECOND: Fall back to word-by-word translation
    const words = text.split(/\s+/);
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w\s]/gi, '');
      if (cleanWord === '') return;

      if (translationDictionary[cleanWord]) {
        const translation = translationDictionary[cleanWord];
        container.appendChild(createTranslationItem(cleanWord, translation.image));
      } else {
        // Fingerspell if word not found
        const wordElement = document.createElement('div');
        wordElement.className = 'translation-item fingerspelling';

        const wordLabel = document.createElement('span');
        wordLabel.className = 'translation-word';
        wordLabel.textContent = cleanWord;

        const letterContainer = document.createElement('div');
        letterContainer.className = 'letter-container';

        for (const letter of cleanWord.toUpperCase()) {
          if (fingerspellingAlphabet[letter]) {
            const letterImg = document.createElement('img');
            letterImg.src = fingerspellingAlphabet[letter];
            letterImg.alt = `Sign for letter ${letter}`;
            letterImg.className = 'letter-image';
            letterContainer.appendChild(letterImg);
          }
        }

        wordElement.appendChild(letterContainer);
        wordElement.appendChild(wordLabel);
        container.appendChild(wordElement);
      }
    });
  }, 800);
}

/**
 * Creates a translation item element
 * @param {string} word - The original word
 * @param {string} imageUrl - URL to the sign image
 * @returns {HTMLElement} The created element
 */
function createTranslationItem(word, imageUrl) {
  const item = document.createElement('div');
  item.className = 'translation-item';
  
  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = `Sign for ${word}`;
  image.className = 'translation-image';
  
  const wordSpan = document.createElement('span');
  wordSpan.className = 'translation-word';
  wordSpan.textContent = word;
  
  item.appendChild(image);
  item.appendChild(wordSpan);
  
  return item;
}

/**
 * Shows the empty state for the translator
 */
function showEmptyState() {
  const translationResult = document.querySelector('.translation-result');
  translationResult.classList.remove('has-content');
  
  translationResult.innerHTML = `
    <div class="translation-empty">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <h3>Enter text to translate</h3>
      <p>Type some text above and click "Translate" to see it in sign language</p>
    </div>
  `;
}

/**
 * Shows the loading state for the translator
 */
function showLoadingState() {
  const translationResult = document.querySelector('.translation-result');
  translationResult.innerHTML = `
    <div class="translation-loading">
      <div class="spinner"></div>
    </div>
  `;
}