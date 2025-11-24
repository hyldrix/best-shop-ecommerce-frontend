# Best Shop - E-Commerce Luggage Store - Front-end

A modern, fully-functional e-commerce website template for a luggage and travel accessories store. Built with vanilla JavaScript, SCSS, and HTML5, featuring a responsive design, shopping cart functionality, and product management system.

![alt text](https://github.com/hyldrix/best-shop-ecommerce-frontend/blob/main/project%20screenshots/Macbook-Air-1559x6491.png "Page visual")

## 🎯 Project Overview

Best Shop is a comprehensive frontend e-commerce template designed for selling travel suitcases and luggage sets. The project demonstrates professional web development practices including modular architecture, state management, form validation, and dynamic content rendering.

### Key Features

- **Product Catalog** - Browse and filter travel suitcases and luggage sets
- **Shopping Cart** - Add/remove items, modify quantities, with persistent storage using localStorage
- **Product Details** - Comprehensive product pages with ratings, reviews, and specifications
- **Search Functionality** - Find products by name with instant feedback
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **User Authentication** - Login modal with email and password validation
- **Review System** - Customers can rate and review products
- **Dynamic Pricing** - Automatic discount calculation based on cart contents
- **Multiple Pages** - Home, Catalog, Product Details, About, Contact, and Cart pages

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
```
2. Navigate to the project directory:
```bash
cd <main project directory>
```
3. Install dependencies:
```bash
npm install
```
## Development

Start the development server with live reload and SCSS compilation:
```bash
npm run dev
```

This command runs both the live server and SCSS watcher simultaneously.

### Alternative commands:

| Script | Purpose |
|--------|---------|
| `npm start` | Start live development server |
| `npm run dev` | Run dev server + SCSS watcher |
| `npm run compile` | Compile SCSS to CSS once |
| `npm run compile:watch` | Watch and compile SCSS continuously |
| `npm run lint` | Run ESLint and Stylelint |

### Module type
The project uses ES6 modules ("type": "module" in package.json), enabling:
- import/export syntax
- Modular code organization
- Better code splitting


### 📁 Project Structure
```src/
├── index.html              # Home page with hero section and featured products
├── html/
│   ├── catalog.html        # Product catalog with filtering
│   ├── product.html        # Individual product details page
│   ├── about.html          # About Us page
│   ├── contact.html        # Contact form page
│   └── cart.html           # Shopping cart page
├── js/
│   ├── main.js             # Core classes: DataOperations, RenderEngine, ShoppingCart, etc.
│   ├── templates.js        # HTML template strings for dynamic content
│   ├── catalog.js          # Catalog page functionality
│   ├── product.js          # Product page functionality
│   ├── about.js            # About page functionality
│   └── contact.js          # Contact page functionality
├── scss/
│   ├── abstracts/          # Variables, mixins, functions
│   ├── base/               # Base styles, typography, resets
│   ├── components/         # Reusable component styles
│   ├── layouts/            # Layout-specific styles (header, footer, modal)
│   ├── pages/              # Page-specific styles
│   └── main.scss           # Main SCSS entry point
├── css/                    # Compiled CSS output
└── assets/
    ├── images/             # Product and marketing images
    ├── icons/              # UI icons and logos
    ├── payment-providers/  # Payment method logos
    └── data.json           # Product database
```

## 🛠️ Core Classes & Functionality

### **DataOperations** - Handles all data fetching from the JSON file:

- ```getData(url)``` - Fetches product data asynchronously

### **RenderEngine** - Manages dynamic DOM rendering:
- ```renderProducts()``` - Renders filtered product cards
- ```renderRandomBestSets()``` - Displays random best-selling sets
- ```renderCatalogPage()``` - Renders full catalog
- ```createProductCard()``` - Creates individual product card elements

### **ShoppingCart** - Manages shopping cart state and persistence:
- ```addToCart()``` - Add items to cart with quantity
- ```getCart()``` - Retrieve cart from localStorage
- ```modifyQuantity()``` - Update item quantities
- ```deleteItem()``` - Remove items from cart
- ```renderMyCart()``` - Display cart contents
- ```renderTotals()``` - Calculate subtotal, discounts, shipping, and total
- ```checkout()``` - Process checkout

### **Discount Logic:**

10% discount applied when:
- Subtotal ≥ $3000, OR
- Cart contains luggage sets, OR
- Cart contains items with size 'S-L' or 'S, M, XL'

### **Header & Footer**  Manages navigation and layout templates:
- Dynamic header with logo, navigation, user icons, and login modal
- Footer with benefits, site map, and contact information

### **LoginModal** - Handles user authentication UI:
- Email and password validation
- Password visibility toggle
- Error message display

### **ReviewForm** & **FeedbackForm** -Form validation and submission:
- Email validation
- Required field checking
- Success/error messaging

### **SearchProducts** - Product search functionality:
- Real-time search by product name
- Redirects to product page on match
- Popup notification for no results

## **QuantityControls**
- Manages quantity input controls:
- Increment/decrement buttons
- Direct input validation
- Cart-specific quantity modifications

## 📊 Data Structure
Products in data.json include:
```{
  id: number,
  name: string,
  price: number,
  imageUrl: string,
  rating: number (1-5),
  size: string,
  color: string,
  category: string,
  salesStatus: boolean
}
```

## 🎨 Styling
The project uses SCSS with a 7-1 architecture pattern:
- Abstracts - Variables, mixins, and utility functions
- Base - Global styles and typography
- Components - Reusable UI components (buttons, cards, modals)
- Layouts - Header, footer, and page layouts
- Pages - Page-specific overrides
- Themes - Theme variations
- Vendors - Third-party styles (Font Awesome)

### Configuration files:
- eslint.config.mjs - JavaScript linting rules
- stylelint.config.mjs - CSS/SCSS linting rules


### 🔐 Local Storage
The application uses browser localStorage for:
- Shopping Cart - Persists cart items across sessions

### 📝 Configuration
Package.json Scripts


## License: ISC
