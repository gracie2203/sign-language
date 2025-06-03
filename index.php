<?php
require_once 'config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <title>Signbridge - Learn Sign Language</title>
  <link rel="stylesheet" href="css/main.css" />
  <link rel="stylesheet" href="css/library.css" />
  <link rel="stylesheet" href="css/translator.css" />
  <link rel="stylesheet" href="css/album.css" />
</head>
<body>
  <header>
    <div class="container">
      <div class="logo">
        <h1>Signbridge</h1>
        <p>Learn Sign Language Easily</p>
      </div>
    <div class="auth-buttons" style="margin-left: auto;">
    <span>Welcome, <?php echo htmlspecialchars($_SESSION['username']) ; ?></span>
    <a href="logout.php" class="logout-btn">Logout</a>
</div>


    </div>
      <nav>
        <button id="menu-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul id="main-nav">
          <li><a href="#" class="active" data-section="home">Home</a></li>
          <li><a href="#" data-section="library">Library</a></li>
          <li><a href="#" data-section="translator">Translator</a></li>
          <li><a href="#" data-section="album">Album</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <!-- Home Section -->
     
    <section id="home" class="active">
      <div class="container">
        <div class="hero">
          <h2>Welcome to Signbridge</h2>
          <p>Your gateway to learning sign language with ease and fun</p>
          <div class="features">
            <div class="feature-card">
              <div class="feature-icon library-icon"></div>
              <h3>Library</h3>
              <p>Explore our dictionary of sign language alphabetically</p>
              <button class="navigate-btn" data-section="library">Explore Library</button>
            </div>
            <div class="feature-card">
              <div class="feature-icon translator-icon"></div>
              <h3>Translator</h3>
              <p>Convert text into sign language instantly</p>
              <button class="navigate-btn" data-section="translator">Try Translator</button>
            </div>
            <div class="feature-card">
              <div class="feature-icon album-icon"></div>
              <h3>Album</h3>
              <p>Browse everyday sign language expressions</p>
              <button class="navigate-btn" data-section="album">View Album</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Library Section -->
    <section id="library">
      <div class="container">
        <h2>Sign Language Library</h2>
        <p>Explore sign language words alphabetically</p>
        
        <div class="alphabet-nav">
          <!-- Alphabet navigation will be generated dynamically -->
        </div>
        
        <div class="search-container">
          <input type="text" id="library-search" placeholder="Search for a word...">
          <button id="library-search-btn">Search</button>
        </div>
        
        <div class="library-content">
          <div id="letter-display">
            <!-- Selected letter will be displayed here -->
          </div>
          <div id="sign-list">
            <!-- Sign language words for selected letter will appear here -->
          </div>
        </div>
      </div>
    </section>

    <!-- Translator Section -->
   <section id="translator">
    <div class="container">
        <h2>Sign Language Translator</h2>
        <p>Type text and see it translated to sign language</p>
        
        <!-- ADD THIS WRAPPER DIV -->
       <div class="translator-container">
  <div class="translator-input-container">
    <div class="translator-input">
      <textarea id="text-to-translate" placeholder="Type text to translate..."></textarea>
      <button id="translate-btn">Translate</button>
    </div>
  </div>

  <div class="translation-result-container">
    <div class="translation-result">
        </div>
      </div>
    </section>

    <!-- Album Section -->
    <!-- Album Section -->
<section id="album">
    <div class="container">
        <h2>Sign Language Album</h2>
        <div class="album-categories">
            <!-- Categories will be generated dynamically -->
        </div>
        <div class="album-gallery">
            <!-- Sign language expressions will appear here -->
        </div>
    </div>
</section>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2025 Signbridge. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script type="module" src="js/main.js"></script>
</body>
</html>