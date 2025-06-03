/**
 * Album Module
 * Handles the curated collection of everyday sign language expressions
 */

import { albumData } from './data.js';

let activeCategory = 'all';

export function initAlbum() {
  console.log('Initializing Album Module');
  createCategoryButtons();
  displayExpressions('all');
  setupModal();
}

function createCategoryButtons() {
  const categoriesContainer = document.querySelector('.album-categories');

  const allButton = document.createElement('button');
  allButton.textContent = 'All';
  allButton.className = 'category-btn active';
  allButton.addEventListener('click', () => {
    setActiveCategory('all');
    displayExpressions('all');
  });
  categoriesContainer.appendChild(allButton);

  albumData.categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category;
    button.className = 'category-btn';
    button.addEventListener('click', () => {
      setActiveCategory(category);
      displayExpressions(category);
    });
    categoriesContainer.appendChild(button);
  });
}

function setActiveCategory(category) {
  activeCategory = category;

  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(btn => {
    if ((btn.textContent === category) ||
        (category === 'all' && btn.textContent === 'All')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function displayExpressions(category) {
  console.log(`Displaying expressions for category: ${category}`);

  const galleryElement = document.querySelector('.album-gallery');

  const expressions = category === 'all'
    ? albumData.expressions
    : albumData.expressions.filter(expr => expr.category === category);

  if (expressions.length === 0) {
    galleryElement.innerHTML = `
      <div class="album-empty">
        <h3>No expressions available</h3>
        <p>There are no sign language expressions in this category yet.</p>
      </div>
    `;
    return;
  }

  galleryElement.innerHTML = expressions.map(expr => `
    <div class="album-card" data-id="${expr.id}">
      <div class="album-image-container">
        <img class="album-image" src="${expr.image}" alt="${expr.title}" loading="lazy">
      </div>
      <div class="album-content">
        <span class="album-category">${expr.category}</span>
        <h3 class="album-title">${expr.title}</h3>
      </div>
    </div>
  `).join('');
}

function setupModal() {
  if (!document.querySelector('.video-modal')) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Sign Language Video</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
      const video = modal.querySelector('video');
      if (video) {
        video.pause();
      }
      modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        const video = modal.querySelector('video');
        if (video) {
          video.pause();
        }
        modal.classList.remove('show');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        const video = modal.querySelector('video');
        if (video) {
          video.pause();
        }
        modal.classList.remove('show');
      }
    });
  }
}

function showVideo(id) {
  console.log(`Showing video for expression ID: ${id}`);

  const expression = albumData.expressions.find(expr => expr.id === id);

  if (!expression || !expression.video) {
    console.error('Expression or video URL not found');
    return;
  }

  const modal = document.querySelector('.video-modal');
  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');

  modalTitle.textContent = expression.title;

  modalBody.innerHTML = `
    <video controls autoplay style="width: 100%; max-height: 70vh;">
      <source src="${expression.video}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;

  modal.classList.add('show');
  modal.focus();
}
