window.addEventListener("DOMContentLoaded", () => {
  fetch("components/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
      setupHeaderActions();
    });

  fetch("components/footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer").innerHTML = data);

  if (document.getElementById("bookList")) {
    renderBooks();
    document.getElementById("searchInput").addEventListener("input", searchBooks);
  }

  if (document.getElementById("cartItems")) renderCart();
  if (document.getElementById("wishlistItems")) renderWishlist();

  initAIAssistant();
  setupAuthForms();
});

const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    img: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    description: "A novel of warmth and humor despite dealing with serious issues of rape and racial inequality."
  },
  {
    title: "1984",
    author: "George Orwell",
    img: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    description: "A dystopian novel set in a totalitarian regime where 'Big Brother' watches all."
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    img: "https://covers.openlibrary.org/b/id/10958362-L.jpg",
    description: "Tiny changes, remarkable results. A guide to building good habits and breaking bad ones."
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    img: "https://covers.openlibrary.org/b/id/10580516-L.jpg",
    description: "An allegorical novel about following your dreams and destiny."
  },
  {
    title: "Ikigai",
    author: "Héctor García",
    img: "https://covers.openlibrary.org/b/id/10523353-L.jpg",
    description: "Discover the Japanese secret to a long and happy life."
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    img: "https://covers.openlibrary.org/b/id/11109709-L.jpg",
    description: "What the rich teach their kids about money that the poor and middle class do not."
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    img: "https://covers.openlibrary.org/b/id/7352168-L.jpg",
    description: "A critique of the American Dream set in the Jazz Age."
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    img: "https://covers.openlibrary.org/b/id/7884866-L.jpg",
    description: "The magical story of a young wizard and his friends at Hogwarts."
  }
];

// --- Render Books ---
function renderBooks(filteredBooks = books) {
  const container = document.getElementById("bookList");
  container.innerHTML = "";

  filteredBooks.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}" onclick="showDetails(${index})"/>
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
      <button onclick="addToWishlist(${index})">Wishlist</button>
    `;
    container.appendChild(card);
  });
}

// --- Render Cart ---
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${book.img}" />
      <h3>${book.title}</h3>
      <p>${book.author}</p>
    `;
    container.appendChild(card);
  });
}

// --- Render Wishlist ---
function renderWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const container = document.getElementById("wishlistItems");
  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  wishlist.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${book.img}" />
      <h3>${book.title}</h3>
      <p>${book.author}</p>
    `;
    container.appendChild(card);
  });
}

// --- Add to Cart ---
function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(books[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Book added to cart.");
}

// --- Add to Wishlist ---
function addToWishlist(index) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.push(books[index]);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Book added to wishlist.");
}

// --- Search ---
function searchBooks(e) {
  const value = e.target.value.toLowerCase();
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(value) ||
    book.author.toLowerCase().includes(value)
  );
  renderBooks(filtered);
}

// --- Modal for Book Details ---
function showDetails(index) {
  const book = books[index];
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <img src="${book.img}" />
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p>${book.description}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
      <button onclick="addToWishlist(${index})">Wishlist</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function setupHeaderActions() {
  const openAI = document.getElementById("openAIButton");
  if (!openAI) return;
  openAI.addEventListener("click", () => {
    const panel = document.getElementById("chatPanel");
    if (panel) panel.classList.toggle("open");
  });
}

function initAIAssistant() {
  const assistant = document.createElement("div");
  assistant.className = "ai-widget";
  assistant.innerHTML = `
    <button class="chat-toggle" id="chatToggle">🤖 AI Help</button>
    <div class="chat-panel" id="chatPanel">
      <div class="chat-header">
        <span>Assistant</span>
        <button id="closeChat">&times;</button>
      </div>
      <div class="chat-messages" id="chatMessages">
        <div class="chat-system">Hi! I can help you with this portfolio app, GitHub setup and MongoDB Atlas validation strategy.</div>
      </div>
      <form class="chat-form" id="chatForm">
        <input type="text" id="chatInput" placeholder="Describe an issue..." autocomplete="off" />
        <button type="submit">Send</button>
      </form>
    </div>
  `;
  document.body.appendChild(assistant);

  document.getElementById("chatToggle").addEventListener("click", () => {
    document.getElementById("chatPanel").classList.toggle("open");
  });
  document.getElementById("closeChat").addEventListener("click", () => {
    document.getElementById("chatPanel").classList.remove("open");
  });
  document.getElementById("chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    if (!message) return;
    appendChat("user", message);
    input.value = "";
    setTimeout(() => {
      appendChat("assistant", generateAIBotResponse(message));
    }, 350);
  });
}

function appendChat(role, text) {
  const messages = document.getElementById("chatMessages");
  if (!messages) return;
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${role}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function generateAIBotResponse(message) {
  const query = message.toLowerCase();
  if (query.includes("login") || query.includes("signup") || query.includes("auth")) {
    return "This portfolio demo uses front-end validation now and can be connected to a MongoDB Atlas backend for real user authentication. Use secure API routes to validate credentials and store user profiles.";
  }
  if (query.includes("github")) {
    return "Push this project to GitHub with a README, demo notes, and the final portfolio link. GitHub Pages can host the front end while backend auth lives in a separate Node/Express app connected to MongoDB Atlas.";
  }
  if (query.includes("cart") || query.includes("wishlist")) {
    return "The cart and wishlist are currently stored in localStorage for a smooth demo experience. You can later sync them with MongoDB Atlas for persistent user data.";
  }
  if (query.includes("style") || query.includes("grid") || query.includes("layout")) {
    return "The app uses a responsive grid layout for product cards and a consistent color palette for portfolio-ready presentation. This is ideal for GitHub demos and UI showcase.";
  }
  return "This is a portfolio-friendly project assistant. Ask about GitHub setup, MongoDB Atlas validation, or how to improve the UI and feature set for your resume.";
}

function setupAuthForms() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const [email, password] = Array.from(loginForm.querySelectorAll("input")).map(input => input.value.trim());
      if (!validateEmail(email) || password.length < 6) {
        alert("Please enter a valid email and a password of at least 6 characters.");
        return;
      }
      alert("Login ready for MongoDB Atlas validation. Connect this form to an auth backend API next.");
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const [name, email, password] = Array.from(signupForm.querySelectorAll("input")).map(input => input.value.trim());
      if (!name || !validateEmail(email) || password.length < 6) {
        alert("Please provide your name, a valid email, and a password of at least 6 characters.");
        return;
      }
      alert("Signup ready for MongoDB Atlas validation. This form can post user data to your backend service.");
    });
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
