# MHM Books Store

A portfolio-ready bookstore demo built for GitHub and resume presentation.

## Features

- Responsive landing and product pages with shared header/footer components.
- Cart and wishlist using `localStorage` for demo persistence.
- Login and signup pages with front-end validation and placeholder support for MongoDB Atlas authentication.
- Simple AI assistant widget for guided app help and portfolio presentation.
- Modern color palette and responsive grid layout for cards.

## What is implemented

- Shared header and footer injection using `components/header.html` and `components/footer.html`.
- Product render and search filtering in `assets/script.js`.
- Login/signup forms prepared with `id` attributes and validation logic.
- AI help assistant providing canned guidance and portfolio-friendly messaging.

## Portfolio / GitHub setup notes

- Commit the full project to GitHub as a static demo.
- Use GitHub Pages for front-end hosting.
- Add a project description, screenshots, and a live demo link.
- In a future enhancement, connect login/signup forms to a Node/Express backend with MongoDB Atlas for real user authentication.

## MongoDB Atlas integration

This project is structured for future backend integration:

- Use MongoDB Atlas to store user credentials securely.
- Implement backend routes to validate login and signup requests.
- Keep sensitive logic on the server and never store credentials in client-side code.

## Running locally

1. Open the `mnpro` directory in a code editor.
2. Open `index.html` in a browser or serve the folder with a local server.
3. Navigate the UI and use the AI helper for guidance.

## Project structure

- `index.html` — homepage
- `products.html` — books listing
- `cart.html` — cart page
- `wishlist.html` — wishlist page
- `login.html` — login form
- `signup.html` — signup form
- `about.html` — about page
- `contact.html` — contact page
- `assets/style.css` — styling and responsive layout
- `assets/script.js` — app logic, UI rendering, and helper functions
- `components/header.html` — shared header
- `components/footer.html` — shared footer
