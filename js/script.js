/* =========================================
   LUXE — Premium Fashion Store
   script.js
   ========================================= */

// ========================================
// VALIDATION UTILITY FUNCTIONS
// ========================================

const disposableDomains = ['mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email', 'yopmail.com'];

function isValidEmail(val) {
  const trimmed = val.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return false;
  const domain = trimmed.split('@')[1].toLowerCase();
  return !disposableDomains.includes(domain);
}

function isNameOnly(val) {
  const trimmed = val.trim();
  if (!trimmed) return false;
  return /^[A-Za-z\s\-']+$/.test(trimmed) && !/\d/.test(trimmed);
}

function isDigitsOnly(val) {
  const trimmed = val.trim();
  return /^\d+$/.test(trimmed);
}

function hasNoDigits(val) {
  return !/\d/.test(val);
}

function isAlphanumeric(val) {
  const trimmed = val.trim();
  return /^[A-Za-z0-9]+$/.test(trimmed);
}

function isValidPakistaniPostal(val) {
  const trimmed = val.trim();
  return /^\d{5}$/.test(trimmed);
}

function isValidCardNumber(val) {
  const stripped = val.replace(/\s/g, '');
  if (!/^\d{16}$/.test(stripped)) return false;

  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  for (let i = stripped.length - 1; i >= 0; i--) {
    let digit = parseInt(stripped[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

function isValidExpiry(val) {
  const cleaned = val.replace(/\s/g, '').replace(/\//g, '');
  if (!/^\d{4}$/.test(cleaned)) return false;

  const month = parseInt(cleaned.substring(0, 2), 10);
  const year = parseInt(cleaned.substring(2, 4), 10);

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
}

function isValidCVV(val) {
  const trimmed = val.trim();
  return /^\d{3,4}$/.test(trimmed);
}

function sanitizeInput(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showFieldError(inputEl, message) {
  inputEl.classList.add('field-invalid');
  inputEl.classList.remove('field-success');

  let errorSpan = inputEl.nextElementSibling;
  if (inputEl.parentElement.classList.contains('input-wrapper')) {
    errorSpan = inputEl.parentElement.nextElementSibling;
  }

  if (errorSpan && errorSpan.classList.contains('field-error')) {
    errorSpan.textContent = message;
  }
}

function showFieldSuccess(inputEl) {
  inputEl.classList.remove('field-invalid');
  inputEl.classList.add('field-success');

  let errorSpan = inputEl.nextElementSibling;
  if (inputEl.parentElement.classList.contains('input-wrapper')) {
    errorSpan = inputEl.parentElement.nextElementSibling;
  }

  if (errorSpan && errorSpan.classList.contains('field-error')) {
    errorSpan.textContent = '';
  }
}

function clearFieldState(inputEl) {
  inputEl.classList.remove('field-invalid', 'field-success');

  let errorSpan = inputEl.nextElementSibling;
  if (inputEl.parentElement.classList.contains('input-wrapper')) {
    errorSpan = inputEl.parentElement.nextElementSibling;
  }

  if (errorSpan && errorSpan.classList.contains('field-error')) {
    errorSpan.textContent = '';
  }
}

function setButtonLoading(btnEl, text) {
  btnEl.disabled = true;
  btnEl.textContent = text;
}

function resetButton(btnEl, text) {
  btnEl.disabled = false;
  btnEl.textContent = text;
}

// ========================================
// PRODUCTS DATA
// ========================================

const products = [
  { id:1, name:"Silk Drape Midi Dress", cat:"Women", price:8500, oldPrice:null, badge:"new", rating:5, reviews:24, img:"assets/Silk Drape Midi Dress.jpg", category:"women" },
  { id:2, name:"Structured Blazer", cat:"Men", price:12000, oldPrice:16000, badge:"sale", rating:4, reviews:18, img:"assets/Structured Blazer.jpg", category:"men" },
  { id:3, name:"Slim Fit Linen Suit", cat:"Men", price:18500, oldPrice:null, badge:"new", rating:5, reviews:11, img:"assets/Slim Fit Linen Suit.jpg", category:"men" },
  { id:4, name:"Premium Leather Tote", cat:"Accessories", price:9200, oldPrice:13000, badge:"sale", rating:5, reviews:32, img:"assets/Premium Leather Tote.jpg", category:"accessories" },
  { id:5, name:"Floral Wrap Dress", cat:"Women", price:6800, oldPrice:null, badge:null, rating:4, reviews:15, img:"assets/Floral Wrap Dress.jpg", category:"women" },
  { id:6, name:"Oxford Shirt — Classic", cat:"Men", price:4200, oldPrice:null, badge:null, rating:4, reviews:29, img:"assets/Oxford Shirt — Classic.jpg", category:"men" },
  { id:7, name:"Gold Chain Bracelet", cat:"Accessories", price:3500, oldPrice:5000, badge:"sale", rating:5, reviews:42, img:"assets/Gold Chain Bracelet.jpg", category:"accessories" },
  { id:8, name:"Cashmere Oversized Coat", cat:"Women", price:24000, oldPrice:null, badge:"new", rating:5, reviews:8, img:"assets/Cashmere Oversized Coat.jpg", category:"women" },
  { id:9, name:"Velvet Evening Gown", cat:"Women", price:28000, oldPrice:null, badge:"new", rating:5, reviews:12, img:"assets/Velvet Evening Gown.jpg", category:"women" },
  { id:10, name:"Pleated Maxi Skirt", cat:"Women", price:7500, oldPrice:10000, badge:"sale", rating:4, reviews:21, img:"assets/Pleated Maxi Skirt.jpg", category:"women" },
  { id:11, name:"Embroidered Tunic Top", cat:"Women", price:5500, oldPrice:null, badge:null, rating:4, reviews:19, img:"assets/Embroidered Tunic Top.jpg", category:"women" },
  { id:12, name:"Satin Slip Dress", cat:"Women", price:9800, oldPrice:null, badge:null, rating:5, reviews:16, img:"assets/Satin Slip Dress.jpg", category:"women" },
  { id:13, name:"Wool Overcoat", cat:"Women", price:22000, oldPrice:null, badge:"new", rating:5, reviews:14, img:"assets/Wool Overcoat.jpg", category:"women" },
  { id:14, name:"Chinos — Slim Fit", cat:"Men", price:6500, oldPrice:8500, badge:"sale", rating:4, reviews:27, img:"assets/Chinos — Slim Fit.jpg", category:"men" },
  { id:15, name:"Denim Jacket", cat:"Men", price:8900, oldPrice:null, badge:null, rating:4, reviews:33, img:"assets/Denim Jacket.jpg", category:"men" },
  { id:16, name:"Knit Sweater", cat:"Men", price:7200, oldPrice:null, badge:null, rating:5, reviews:18, img:"assets/Knit Sweater.jpg", category:"men" },
  { id:17, name:"Formal Dress Shoes", cat:"Men", price:12500, oldPrice:null, badge:null, rating:5, reviews:22, img:"assets/Formal Dress Shoes.jpg", category:"men" },
  { id:18, name:"Polo Shirt — Navy", cat:"Men", price:4500, oldPrice:null, badge:null, rating:4, reviews:25, img:"assets/Polo Shirt — Navy.jpg", category:"men" },
  { id:19, name:"Silk Scarf", cat:"Accessories", price:3800, oldPrice:null, badge:"new", rating:5, reviews:28, img:"assets/Silk Scarf.jpg", category:"accessories" },
  { id:20, name:"Leather Belt", cat:"Accessories", price:4200, oldPrice:6000, badge:"sale", rating:4, reviews:35, img:"assets/Leather Belt.jpg", category:"accessories" },
  { id:21, name:"Designer Sunglasses", cat:"Accessories", price:8500, oldPrice:null, badge:null, rating:5, reviews:17, img:"assets/Designer Sunglasses.jpg", category:"accessories" },
  { id:22, name:"Pearl Necklace", cat:"Accessories", price:12000, oldPrice:null, badge:null, rating:5, reviews:13, img:"assets/Pearl Necklace.jpg", category:"accessories" },
  { id:23, name:"Crossbody Bag", cat:"Accessories", price:6800, oldPrice:null, badge:null, rating:4, reviews:29, img:"assets/Crossbody Bag.jpg", category:"accessories" },
  { id:24, name:"Ankle Boots", cat:"Accessories", price:14500, oldPrice:null, badge:"new", rating:5, reviews:11, img:"assets/Ankle Boots.jpg", category:"accessories" },
];

let cart = JSON.parse(localStorage.getItem('luxe_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('luxe_wishlist') || '[]');
let currentDiscount = 0;

function saveCart() {
  localStorage.setItem('luxe_cart', JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist));
}

function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach(p => {
    const stars = '★'.repeat(p.rating) + '☆'.repeat(5 - p.rating);
    const badgeHtml = p.badge ? `<div class="product-badge badge-${p.badge}">${p.badge}</div>` : '';
    const oldPriceHtml = p.oldPrice ? `<span class="old-price">Rs. ${p.oldPrice.toLocaleString()}</span>` : '';
    grid.innerHTML += `
      <div class="col-6 col-lg-3 product-data" data-cat="${p.category}">
        <div class="product-card">
          <a href="product.html?id=${p.id}" class="product-link">
            <div class="product-img-wrap">
              ${badgeHtml}
              <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
          </a>
          <div class="product-actions">
            <button class="btn-add-cart js-add-cart" data-id="${p.id}">Add to Bag</button>
            <button class="btn-wishlist js-wishlist" data-id="${p.id}" aria-label="Add ${p.name} to wishlist"><i class="bi bi-heart"></i></button>
          </div>
          <div class="product-info">
            <div class="product-cat">${p.cat}</div>
            <a href="product.html?id=${p.id}" class="product-link">
              <h5>${p.name}</h5>
            </a>
            <div class="product-price">${oldPriceHtml}Rs. ${p.price.toLocaleString()}</div>
            <div class="product-rating"><span class="stars">${stars}</span><span>(${p.reviews})</span></div>
          </div>
        </div>
      </div>`;
  });
}

function appendProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  list.forEach(p => {
    const stars = '★'.repeat(p.rating) + '☆'.repeat(5 - p.rating);
    const badgeHtml = p.badge ? `<div class="product-badge badge-${p.badge}">${p.badge}</div>` : '';
    const oldPriceHtml = p.oldPrice ? `<span class="old-price">Rs. ${p.oldPrice.toLocaleString()}</span>` : '';
    grid.innerHTML += `
      <div class="col-6 col-lg-3 product-data" data-cat="${p.category}">
        <div class="product-card">
          <a href="product.html?id=${p.id}" class="product-link">
            <div class="product-img-wrap">
              ${badgeHtml}
              <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
          </a>
          <div class="product-actions">
            <button class="btn-add-cart js-add-cart" data-id="${p.id}">Add to Bag</button>
            <button class="btn-wishlist js-wishlist" data-id="${p.id}" aria-label="Add ${p.name} to wishlist"><i class="bi bi-heart"></i></button>
          </div>
          <div class="product-info">
            <div class="product-cat">${p.cat}</div>
            <a href="product.html?id=${p.id}" class="product-link">
              <h5>${p.name}</h5>
            </a>
            <div class="product-price">${oldPriceHtml}Rs. ${p.price.toLocaleString()}</div>
            <div class="product-rating"><span class="stars">${stars}</span><span>(${p.reviews})</span></div>
          </div>
        </div>
      </div>`;
  });
}

let currentCategoryFilter = 'all';
let currentSortOrder = 'featured';
let currentDisplayCount = 8;
let currentFilteredProducts = [];

function filterProducts(cat, btn) {
  if (btn) {
    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
  }
  currentCategoryFilter = cat;
  currentDisplayCount = 8; // Reset to 8 when filtering changes
  applyFiltersAndSort();
}

function applyFiltersAndSort() {
  let filtered = currentCategoryFilter === 'all' ? [...products] :
                 currentCategoryFilter === 'sale' ? products.filter(p => p.badge === 'sale') :
                 products.filter(p => p.category === currentCategoryFilter);

  if (currentSortOrder === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSortOrder === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSortOrder === 'newest') {
    filtered.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
  } else {
    filtered.sort((a, b) => a.id - b.id); // Featured/Default
  }

  currentFilteredProducts = filtered;
  renderProductsWithPagination();
}

function renderProductsWithPagination() {
  const productsToShow = currentFilteredProducts.slice(0, currentDisplayCount);
  renderProducts(productsToShow);

  // Update Load More button and completion message visibility
  const loadMoreBtn = document.querySelector('.btn-load-more');
  let completionMsg = document.getElementById('paginationComplete');

  if (loadMoreBtn) {
    const loadMoreParent = loadMoreBtn.parentElement;

    // Create completion message if it doesn't exist
    if (!completionMsg && loadMoreParent) {
      completionMsg = document.createElement('p');
      completionMsg.id = 'paginationComplete';
      completionMsg.className = 'pagination-complete-msg';
      completionMsg.textContent = "You've seen all products";
      loadMoreParent.appendChild(completionMsg);
    }

    if (currentDisplayCount >= currentFilteredProducts.length) {
      loadMoreBtn.style.display = 'none';
      if (completionMsg && currentFilteredProducts.length > 8) {
        completionMsg.style.display = 'block';
      }
    } else {
      loadMoreBtn.style.display = 'inline-block';
      if (completionMsg) {
        completionMsg.style.display = 'none';
      }
    }
  }
}

function loadMoreProducts() {
  const previousCount = currentDisplayCount;
  currentDisplayCount += 8;

  // Get only the new products to append
  const newProducts = currentFilteredProducts.slice(previousCount, currentDisplayCount);
  appendProducts(newProducts);

  // Update button and message visibility
  const loadMoreBtn = document.querySelector('.btn-load-more');
  const completionMsg = document.getElementById('paginationComplete');

  if (loadMoreBtn) {
    if (currentDisplayCount >= currentFilteredProducts.length) {
      loadMoreBtn.style.display = 'none';
      if (completionMsg && currentFilteredProducts.length > 8) {
        completionMsg.style.display = 'block';
      }
    }
  }
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, price: product.price, qty: 1 });
  }
  saveCart();
  updateCart();
  showToast(`"${product.name}" added to bag`);
}

function updateCart() {
  const total = cart.reduce((s, c) => s + Number(c.price) * c.qty, 0);
  const count = cart.reduce((s, c) => s + c.qty, 0);

  const countEl = document.getElementById('cartCount');
  if (countEl) {
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
  }

  const itemsLabel = document.getElementById('cartItemsLabel');
  if (itemsLabel) itemsLabel.textContent = `(${count} item${count !== 1 ? 's' : ''})`;

  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = `Rs. ${total.toLocaleString()}`;

  const emptyCart = document.getElementById('emptyCart');
  const cartItemsDiv = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');

  if (cart.length === 0) {
    if (emptyCart) emptyCart.style.display = 'block';
    if (cartItemsDiv) cartItemsDiv.innerHTML = '';
    if (cartFooter) cartFooter.style.display = 'none';
  } else {
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';
    if (cartItemsDiv) {
      cartItemsDiv.innerHTML = cart.map(c => `
        <div class="cart-item">
          <img src="${c.img}" alt="${c.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h6>${c.name}</h6>
            <p>${c.cat}</p>
            <div class="qty-controls">
              <button class="qty-btn js-change-qty" data-id="${c.id}" data-delta="-1" aria-label="Decrease quantity of ${c.name}">−</button>
              <span class="qty-display">${c.qty}</span>
              <button class="qty-btn js-change-qty" data-id="${c.id}" data-delta="1" aria-label="Increase quantity of ${c.name}">+</button>
            </div>
          </div>
          <div class="cart-item-price">Rs. ${(Number(c.price) * c.qty).toLocaleString()}</div>
        </div>`).join('');
    }
  }
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
    showToast(`"${item.name}" removed from bag`);
  }
  saveCart();
  updateCart();
}

function toggleCart() {
  const overlay = document.getElementById('cartOverlay');
  const sidebar = document.getElementById('cartSidebar');
  const isOpen = sidebar.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function toggleSearch() {
  const el = document.getElementById('searchOverlay');
  if (el) el.classList.toggle('open');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// Countdown Timer
function startCountdown() {
  let endStr = localStorage.getItem('luxe_sale_end');
  let end;
  if (endStr) {
    end = new Date(endStr);
  } else {
    end = new Date();
    end.setHours(end.getHours() + 11, end.getMinutes() + 47, end.getSeconds() + 22);
    localStorage.setItem('luxe_sale_end', end.toISOString());
  }

  setInterval(() => {
    const now = new Date();
    const diff = end - now;
    if (diff <= 0) return;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const cdH = document.getElementById('cd-h');
    const cdM = document.getElementById('cd-m');
    const cdS = document.getElementById('cd-s');
    if (cdH) cdH.textContent = String(h).padStart(2, '0');
    if (cdM) cdM.textContent = String(m).padStart(2, '0');
    if (cdS) cdS.textContent = String(s).padStart(2, '0');
  }, 1000);
}

function toggleWishlist(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const idx = wishlist.findIndex(w => w.id === id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(`"${product.name}" removed from wishlist`);
  } else {
    wishlist.push({ id: product.id, name: product.name, cat: product.cat, price: product.price, img: product.img, category: product.category, rating: product.rating, reviews: product.reviews });
    showToast(`"${product.name}" saved to wishlist`);
  }
  saveWishlist();
  
  if (typeof renderWishlist === 'function' && document.getElementById('wishlistGrid')) {
    renderWishlist();
  }
}

function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  const emptyMsg = document.getElementById('emptyWishlistMsg');
  if (!grid || !emptyMsg) return;

  grid.innerHTML = '';
  
  if (wishlist.length === 0) {
    emptyMsg.classList.remove('d-none');
    return;
  }
  
  emptyMsg.classList.add('d-none');
  
  wishlist.forEach(p => {
    const stars = '★'.repeat(p.rating || 5) + '☆'.repeat(5 - (p.rating || 5));
    grid.innerHTML += `
      <div class="col-6 col-lg-3">
        <div class="product-card">
          <a href="product.html?id=${p.id}" class="product-link-block">
            <div class="product-img-wrap">
              <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
          </a>
          <div class="product-actions">
            <button class="btn-add-cart js-add-cart" data-id="${p.id}">Add to Bag</button>
            <button class="btn-wishlist js-wishlist wishlist-heart-filled" data-id="${p.id}" aria-label="Remove ${p.name} from wishlist"><i class="bi bi-heart-fill"></i></button>
          </div>
          <div class="product-info">
            <div class="product-cat">${p.cat}</div>
            <a href="product.html?id=${p.id}" class="product-link">
              <h5>${p.name}</h5>
            </a>
            <div class="product-price">Rs. ${p.price.toLocaleString()}</div>
            <div class="product-rating"><span class="stars">${stars}</span><span>(${p.reviews || 0})</span></div>
          </div>
        </div>
      </div>`;
  });
}

function renderCheckout() {
  const list = document.getElementById('checkoutItemsList');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const totalEl = document.getElementById('checkoutTotal');
  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
    if (subtotalEl) subtotalEl.textContent = 'Rs. 0';
    if (totalEl) totalEl.textContent = 'Rs. 0';
    return;
  }

  let html = '';
  let total = 0;
  cart.forEach(c => {
    total += c.price * c.qty;
    html += `
      <div class="order-summary-item">
        <div class="d-flex align-items-center">
          <img src="${c.img}" alt="${c.name}">
          <div class="order-summary-info">
            <h6>${c.name}</h6>
            <p>${c.cat} — Qty: ${c.qty}</p>
          </div>
        </div>
        <div class="order-summary-price">
          Rs. ${(c.price * c.qty).toLocaleString()}
        </div>
      </div>
    `;
  });
  list.innerHTML = html;
  const totalStr = 'Rs. ' + total.toLocaleString();
  if (subtotalEl) subtotalEl.textContent = totalStr;
  
  const discountedTotal = total - (total * currentDiscount);
  if (totalEl) totalEl.textContent = 'Rs. ' + discountedTotal.toLocaleString();
}

document.addEventListener('DOMContentLoaded', () => {
  // Extract page category from URL
  const path = window.location.pathname.toLowerCase();
  let defaultCategory = 'all';
  if (path.includes('women.html')) defaultCategory = 'women';
  else if (path.includes('men.html')) defaultCategory = 'men';
  else if (path.includes('accessories.html')) defaultCategory = 'accessories';
  else if (path.includes('sale.html')) defaultCategory = 'sale';

  // Pre-select the correct tab if it exists
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(t => t.classList.remove('active'));
  let matchedTab = Array.from(tabs).find(t => t.textContent.trim().toLowerCase() === defaultCategory);
  if (matchedTab) {
    matchedTab.classList.add('active');
  } else if (tabs.length > 0) {
    tabs[0].classList.add('active');
  }

  // Render initially based on category
  currentCategoryFilter = defaultCategory;
  applyFiltersAndSort();
  startCountdown();
  updateCart();

  // Auto-initialize page-specific renders
  if (document.getElementById('wishlistGrid')) {
    renderWishlist();
  }
  if (document.getElementById('checkoutItemsList')) {
    renderCheckout();
  }

  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Generate order number for order confirmation page
  const orderNumberEl = document.getElementById('orderNumber');
  if (orderNumberEl) {
    const orderNum = `#LX-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    orderNumberEl.textContent = orderNum;
  }

  // ========================================
  // SEARCH INPUT VALIDATION
  // ========================================
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();

        // Validate search input
        if (!query || /^\s+$/.test(e.target.value)) {
          showToast('Please enter a search term.');
          return;
        }
        if (query.length < 2) {
          showToast('Search term must be at least 2 characters.');
          return;
        }
        if (query.length > 100) {
          showToast('Search term is too long (max 100 characters).');
          return;
        }
        if (isDigitsOnly(query)) {
          showToast('Please enter a product name or category to search.');
          return;
        }

        // Sanitize input
        const sanitized = sanitizeInput(query);

        // Filter products based on search query
        const results = products.filter(p =>
          p.name.toLowerCase().includes(sanitized.toLowerCase()) ||
          p.cat.toLowerCase().includes(sanitized.toLowerCase())
        );

        // Store query and results in sessionStorage
        sessionStorage.setItem('luxe_search_query', sanitized);
        sessionStorage.setItem('luxe_search_results', JSON.stringify(results));

        // Redirect to search page
        window.location.href = 'search.html';
      }
    });
  }

  // ========================================
  // NEWSLETTER FORM VALIDATION
  // ========================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    const emailInput = document.getElementById('newsletterEmail');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const msgDiv = document.getElementById('newsletterMsg');

    const validateNewsletterEmail = () => {
      const val = emailInput.value.trim();

      if (!val) {
        showFieldError(emailInput, 'Email address is required.');
        return false;
      }
      if (/^\s+$/.test(emailInput.value)) {
        showFieldError(emailInput, 'Please enter a real email address.');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showFieldError(emailInput, 'Please enter a valid email address (e.g. name@example.com).');
        return false;
      }
      if (!isValidEmail(val)) {
        showFieldError(emailInput, 'Disposable email addresses are not accepted.');
        return false;
      }
      if (/^\d+@/.test(val)) {
        showFieldError(emailInput, 'Please enter a valid email address.');
        return false;
      }

      showFieldSuccess(emailInput);
      return true;
    };

    emailInput.addEventListener('blur', validateNewsletterEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('field-invalid')) {
        clearFieldState(emailInput);
      }
    });

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateNewsletterEmail()) {
        return;
      }

      // Success
      if (msgDiv) {
        msgDiv.textContent = "You're on the list! Welcome to the LUXE Circle.";
        msgDiv.classList.add('newsletter-msg-success');
      }
      showToast('Subscribed successfully!');
      emailInput.value = '';
      clearFieldState(emailInput);

      // Disable button for 3 seconds
      if (submitBtn) {
        setButtonLoading(submitBtn, 'Subscribed');
        setTimeout(() => {
          resetButton(submitBtn, 'Subscribe');
        }, 3000);
      }
    });
  }


  document.addEventListener('click', (e) => {
    // Handle Add to Cart
    if (e.target.closest('.js-add-cart')) {
      const id = parseInt(e.target.closest('.js-add-cart').getAttribute('data-id'), 10);
      addToCart(id);
    }
    // Handle Wishlist
    if (e.target.closest('.js-wishlist')) {
      const id = parseInt(e.target.closest('.js-wishlist').getAttribute('data-id'), 10);
      toggleWishlist(id);
    }
    // Handle Cart Quantity
    if (e.target.closest('.js-change-qty')) {
      const btn = e.target.closest('.js-change-qty');
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const delta = parseInt(btn.getAttribute('data-delta'), 10);
      changeQty(id, delta);
    }
    // Handle Filter Tabs
    if (e.target.closest('.filter-tab')) {
      const btn = e.target.closest('.filter-tab');
      const cat = btn.textContent.trim().toLowerCase();
      
      const path = window.location.pathname.toLowerCase();
      const isCategoryPage = path.includes('women.html') || path.includes('men.html') || path.includes('accessories.html') || path.includes('sale.html');
      
      if (isCategoryPage) {
        if (cat === 'all') {
          window.location.href = 'collections.html';
        } else {
          window.location.href = `${cat}.html`;
        }
      } else {
        filterProducts(cat === 'all' ? 'all' : cat, btn);
      }
    }
    // Handle Load More
    if (e.target.closest('.btn-load-more')) {
      loadMoreProducts();
    }
    // Handle Toggle Search
    if (e.target.closest('.js-toggle-search')) {
      e.preventDefault();
      toggleSearch();
    }
    // Handle Toggle Cart
    if (e.target.closest('.js-toggle-cart') || e.target.closest('#cartOverlay')) {
      if (e.target.closest('a')) e.preventDefault();
      toggleCart();
    }

    // Handle Checkout
    if (e.target.closest('.btn-checkout')) {
      if (cart.length > 0) {
        window.location.href = 'checkout.html';
      } else {
        showToast('Your bag is empty. Add items to proceed.');
      }
    }
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      if (window.location.pathname.toLowerCase().includes('search.html')) return;
      currentSortOrder = e.target.value;
      currentDisplayCount = 8; // Reset to 8 when sorting changes
      applyFiltersAndSort();
    });
  }

  // ========================================
  // CONTACT FORM VALIDATION
  // ========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Name validation
    const validateName = () => {
      const val = nameInput.value.trim();

      if (!val) {
        showFieldError(nameInput, 'Name is required.');
        return false;
      }
      if (/\d/.test(val)) {
        showFieldError(nameInput, 'Name cannot contain numbers.');
        return false;
      }
      if (/[@#$%&*()+=[\]{}|\\;:'"<>,?/]/.test(val)) {
        showFieldError(nameInput, 'Name cannot contain special characters.');
        return false;
      }
      if (val.length < 2) {
        showFieldError(nameInput, 'Name must be at least 2 characters.');
        return false;
      }
      if (val.length > 60) {
        showFieldError(nameInput, 'Name cannot exceed 60 characters.');
        return false;
      }
      if (!isNameOnly(val)) {
        showFieldError(nameInput, 'Name cannot contain special characters.');
        return false;
      }

      showFieldSuccess(nameInput);
      return true;
    };

    // Email validation
    const validateContactEmail = () => {
      const val = emailInput.value.trim();

      if (!val) {
        showFieldError(emailInput, 'Email address is required.');
        return false;
      }
      if (/\s/.test(emailInput.value)) {
        showFieldError(emailInput, 'Email address cannot contain spaces.');
        return false;
      }
      if (!val.includes('@')) {
        showFieldError(emailInput, "Please include an '@' in the email address.");
        return false;
      }
      const atIndex = val.indexOf('@');
      if (atIndex === val.length - 1 || val.substring(atIndex + 1).indexOf('.') === -1) {
        showFieldError(emailInput, 'Please enter a complete email address.');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showFieldError(emailInput, 'Please enter a valid email (e.g. name@example.com).');
        return false;
      }
      if (!isValidEmail(val)) {
        showFieldError(emailInput, 'Please use a permanent email address.');
        return false;
      }

      showFieldSuccess(emailInput);
      return true;
    };

    // Subject validation
    const validateSubject = () => {
      const val = subjectInput.value.trim();

      if (!val) {
        showFieldError(subjectInput, 'Subject is required.');
        return false;
      }
      if (val.length < 3) {
        showFieldError(subjectInput, 'Subject must be at least 3 characters.');
        return false;
      }
      if (val.length > 100) {
        showFieldError(subjectInput, 'Subject cannot exceed 100 characters.');
        return false;
      }
      if (isDigitsOnly(val)) {
        showFieldError(subjectInput, 'Subject must contain meaningful text.');
        return false;
      }
      if (/^\s+$/.test(subjectInput.value)) {
        showFieldError(subjectInput, 'Subject cannot be blank spaces.');
        return false;
      }

      showFieldSuccess(subjectInput);
      return true;
    };

    // Message validation
    const validateMessage = () => {
      const val = messageInput.value.trim();

      if (!val) {
        showFieldError(messageInput, 'Message is required.');
        return false;
      }
      if (val.length < 20) {
        showFieldError(messageInput, 'Message is too short. Please provide more detail (min 20 characters).');
        return false;
      }
      if (val.length > 1000) {
        showFieldError(messageInput, 'Message is too long. Maximum 1000 characters allowed.');
        return false;
      }
      if (isDigitsOnly(val)) {
        showFieldError(messageInput, 'Please write a meaningful message.');
        return false;
      }
      // Check for repeated characters (e.g., "aaaaaaaaaa")
      if (/^(.)\1{9,}$/.test(val)) {
        showFieldError(messageInput, 'Please write a meaningful message.');
        return false;
      }

      showFieldSuccess(messageInput);
      return true;
    };

    // Character counter for message
    const updateCharCounter = () => {
      let counterEl = messageInput.parentElement.querySelector('.char-counter');
      if (!counterEl) {
        counterEl = document.createElement('div');
        counterEl.className = 'char-counter';
        messageInput.parentElement.appendChild(counterEl);
      }

      const length = messageInput.value.length;
      counterEl.textContent = `${length} / 1000`;

      if (length > 900) {
        counterEl.classList.add('danger');
      } else {
        counterEl.classList.remove('danger');
      }
    };

    // Attach blur and input listeners
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('field-invalid')) clearFieldState(nameInput);
    });

    emailInput.addEventListener('blur', validateContactEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('field-invalid')) clearFieldState(emailInput);
    });

    subjectInput.addEventListener('blur', validateSubject);
    subjectInput.addEventListener('input', () => {
      if (subjectInput.classList.contains('field-invalid')) clearFieldState(subjectInput);
    });

    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', () => {
      updateCharCounter();
      if (messageInput.classList.contains('field-invalid')) clearFieldState(messageInput);
    });

    // Initialize character counter
    updateCharCounter();

    // Form submission
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields in order
      const isNameValid = validateName();
      if (!isNameValid) {
        nameInput.focus();
        return;
      }

      const isEmailValid = validateContactEmail();
      if (!isEmailValid) {
        emailInput.focus();
        return;
      }

      const isSubjectValid = validateSubject();
      if (!isSubjectValid) {
        subjectInput.focus();
        return;
      }

      const isMessageValid = validateMessage();
      if (!isMessageValid) {
        messageInput.focus();
        return;
      }

      // All valid - submit
      if (submitBtn) setButtonLoading(submitBtn, 'Sending...');

      setTimeout(() => {
        showToast("Thank you! We'll be in touch within 24 hours.");
        contactForm.reset();
        clearFieldState(nameInput);
        clearFieldState(emailInput);
        clearFieldState(subjectInput);
        clearFieldState(messageInput);
        updateCharCounter();

        if (submitBtn) resetButton(submitBtn, 'Send Message');
      }, 1000);
    });
  }

  // ========================================
  // PASSWORD VISIBILITY TOGGLE
  // ========================================
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Toggle icon
      if (type === 'text') {
        togglePassword.classList.remove('bi-eye');
        togglePassword.classList.add('bi-eye-slash');
      } else {
        togglePassword.classList.remove('bi-eye-slash');
        togglePassword.classList.add('bi-eye');
      }
    });
  }

  // ========================================
  // LOGIN FORM VALIDATION
  // ========================================
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitBtn = loginForm.querySelector('button[type="submit"]');

    // Email validation
    const validateLoginEmail = () => {
      const val = emailInput.value.trim();

      if (!val) {
        showFieldError(emailInput, 'Email address is required.');
        return false;
      }
      if (/\s/.test(emailInput.value)) {
        showFieldError(emailInput, 'Email address cannot contain spaces.');
        return false;
      }
      if (!val.includes('@')) {
        showFieldError(emailInput, "Please include '@' in your email.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showFieldError(emailInput, 'Please enter a valid email address.');
        return false;
      }

      showFieldSuccess(emailInput);
      return true;
    };

    // Password validation
    const validatePassword = () => {
      const val = passwordInput.value;

      if (!val) {
        showFieldError(passwordInput, 'Password is required.');
        return false;
      }
      if (val.length < 8) {
        showFieldError(passwordInput, 'Password must be at least 8 characters.');
        return false;
      }
      if (isDigitsOnly(val)) {
        showFieldError(passwordInput, 'Password cannot be numbers only.');
        return false;
      }
      if (!/\d/.test(val) && /^[A-Za-z]+$/.test(val)) {
        showFieldError(passwordInput, 'Password must include at least one number.');
        return false;
      }

      showFieldSuccess(passwordInput);
      return true;
    };

    // Attach listeners
    emailInput.addEventListener('blur', validateLoginEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('field-invalid')) clearFieldState(emailInput);
    });

    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', () => {
      if (passwordInput.classList.contains('field-invalid')) clearFieldState(passwordInput);
    });

    // Form submission
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isEmailValid = validateLoginEmail();
      if (!isEmailValid) {
        emailInput.focus();
        return;
      }

      const isPasswordValid = validatePassword();
      if (!isPasswordValid) {
        passwordInput.focus();
        return;
      }

      // Simulate authentication
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (submitBtn) setButtonLoading(submitBtn, 'Signing In...');

      setTimeout(() => {
        if (email === 'admin@luxe.pk' && password === 'luxe2024') {
          showToast('Welcome back! Redirecting...');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1500);
        } else {
          showFieldError(passwordInput, 'Invalid email or password.');
          showToast('Login failed. Please check your credentials.');
          if (submitBtn) resetButton(submitBtn, 'Sign In');
        }
      }, 800);
    });
  }

  // Promo Code Handlers
  const togglePromoBtn = document.getElementById('togglePromoBtn');
  const promoContainer = document.getElementById('promoContainer');
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const promoInput = document.getElementById('promoInput');

  if (togglePromoBtn && promoContainer) {
    togglePromoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      promoContainer.style.display = promoContainer.style.display === 'none' ? 'block' : 'none';
    });
  }

  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'LUXE10') {
        currentDiscount = 0.10;
        renderCheckout();
        showToast('10% discount applied!');
      } else {
        currentDiscount = 0;
        renderCheckout();
        showToast('Invalid promo code.');
      }
    });
  }

  // ========================================
  // CHECKOUT FORM VALIDATION
  // ========================================
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    const emailInput = checkoutForm.querySelector('#email');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const zipInput = document.getElementById('zip');

    const creditCardRadio = document.getElementById('creditCard');
    const codRadio = document.getElementById('cod');
    const creditCardForm = document.getElementById('creditCardForm');
    const cardholderNameInput = document.getElementById('cardholderName');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');

    // Email validation
    const validateCheckoutEmail = () => {
      const val = emailInput.value.trim();

      if (!val) {
        showFieldError(emailInput, 'Email address is required.');
        return false;
      }
      if (/\s/.test(emailInput.value)) {
        showFieldError(emailInput, 'Email address cannot contain spaces.');
        return false;
      }
      if (!val.includes('@')) {
        showFieldError(emailInput, "Please include '@' in your email.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showFieldError(emailInput, 'Please enter a valid email address.');
        return false;
      }

      showFieldSuccess(emailInput);
      return true;
    };

    // First name validation
    const validateFirstName = () => {
      const val = firstNameInput.value.trim();

      if (!val) {
        showFieldError(firstNameInput, 'First name is required.');
        return false;
      }
      if (/\d/.test(val)) {
        showFieldError(firstNameInput, 'First name cannot contain numbers.');
        return false;
      }
      if (/[@#$%&*()+=[\]{}|\\;:'"<>,?/]/.test(val)) {
        showFieldError(firstNameInput, 'First name cannot contain special characters.');
        return false;
      }
      if (val.length < 2) {
        showFieldError(firstNameInput, 'First name must be at least 2 characters.');
        return false;
      }
      if (val.length > 40) {
        showFieldError(firstNameInput, 'First name cannot exceed 40 characters.');
        return false;
      }

      showFieldSuccess(firstNameInput);
      return true;
    };

    // Last name validation
    const validateLastName = () => {
      const val = lastNameInput.value.trim();

      if (!val) {
        showFieldError(lastNameInput, 'Last name is required.');
        return false;
      }
      if (/\d/.test(val)) {
        showFieldError(lastNameInput, 'Last name cannot contain numbers.');
        return false;
      }
      if (/[@#$%&*()+=[\]{}|\\;:'"<>,?/]/.test(val)) {
        showFieldError(lastNameInput, 'Last name cannot contain special characters.');
        return false;
      }
      if (val.length < 2) {
        showFieldError(lastNameInput, 'Last name must be at least 2 characters.');
        return false;
      }
      if (val.length > 40) {
        showFieldError(lastNameInput, 'Last name cannot exceed 40 characters.');
        return false;
      }

      showFieldSuccess(lastNameInput);
      return true;
    };

    // Address validation
    const validateAddress = () => {
      const val = addressInput.value.trim();

      if (!val) {
        showFieldError(addressInput, 'Delivery address is required.');
        return false;
      }
      if (val.length < 10) {
        showFieldError(addressInput, 'Please enter your full address (min 10 characters).');
        return false;
      }
      if (isDigitsOnly(val)) {
        showFieldError(addressInput, 'Please enter a valid address including street name.');
        return false;
      }
      if (val.length > 200) {
        showFieldError(addressInput, 'Address is too long.');
        return false;
      }

      showFieldSuccess(addressInput);
      return true;
    };

    // City validation
    const validateCity = () => {
      const val = cityInput.value.trim();

      if (!val) {
        showFieldError(cityInput, 'City is required.');
        return false;
      }
      if (/\d/.test(val)) {
        showFieldError(cityInput, 'City name cannot contain numbers.');
        return false;
      }
      if (/[@#$%&*()+=[\]{}|\\;:'"<>,?/]/.test(val)) {
        showFieldError(cityInput, 'City name cannot contain special characters.');
        return false;
      }
      if (val.length < 2) {
        showFieldError(cityInput, 'Please enter a valid city name.');
        return false;
      }

      showFieldSuccess(cityInput);
      return true;
    };

    // State validation (optional field)
    const validateState = () => {
      const val = stateInput.value.trim();

      if (!val) {
        clearFieldState(stateInput);
        return true; // Optional field
      }

      if (/\d/.test(val)) {
        showFieldError(stateInput, 'Province/state name cannot contain numbers.');
        return false;
      }
      if (/[@#$%&*()+=[\]{}|\\;:'"<>,?/]/.test(val)) {
        showFieldError(stateInput, 'Province/state name cannot contain special characters.');
        return false;
      }

      showFieldSuccess(stateInput);
      return true;
    };

    // Zip validation
    const validateZip = () => {
      const val = zipInput.value.trim();

      if (!val) {
        showFieldError(zipInput, 'Postal code is required.');
        return false;
      }
      if (/[A-Za-z]/.test(val)) {
        showFieldError(zipInput, 'Postal code must contain numbers only.');
        return false;
      }
      if (/[\s@#$%&*()+=[\]{}|\\;:'"<>,?/]/.test(val)) {
        showFieldError(zipInput, 'Postal code cannot contain spaces or symbols.');
        return false;
      }
      if (!isValidPakistaniPostal(val)) {
        showFieldError(zipInput, 'Please enter a valid 5-digit Pakistani postal code.');
        return false;
      }

      showFieldSuccess(zipInput);
      return true;
    };

    // Cardholder name validation
    const validateCardholderName = () => {
      if (codRadio && codRadio.checked) return true; // Skip if COD selected

      const val = cardholderNameInput.value.trim();

      if (!val) {
        showFieldError(cardholderNameInput, 'Cardholder name is required.');
        return false;
      }
      if (/\d/.test(val)) {
        showFieldError(cardholderNameInput, 'Cardholder name cannot contain numbers.');
        return false;
      }
      if (/[@#$%&*()+=[\]{}|\\;:'"<>,?/]/.test(val)) {
        showFieldError(cardholderNameInput, 'Cardholder name cannot contain special characters.');
        return false;
      }
      if (val.length < 2) {
        showFieldError(cardholderNameInput, 'Please enter the full name on your card.');
        return false;
      }

      showFieldSuccess(cardholderNameInput);
      return true;
    };

    // Card number validation
    const validateCardNumber = () => {
      if (codRadio && codRadio.checked) return true; // Skip if COD selected

      const val = cardNumberInput.value;

      if (!val.trim()) {
        showFieldError(cardNumberInput, 'Card number is required.');
        return false;
      }

      const stripped = val.replace(/\s/g, '');

      if (/[A-Za-z]/.test(stripped)) {
        showFieldError(cardNumberInput, 'Card number must contain numbers only.');
        return false;
      }
      if (/[^0-9\s]/.test(val)) {
        showFieldError(cardNumberInput, 'Card number cannot contain special characters.');
        return false;
      }
      if (stripped.length !== 16) {
        showFieldError(cardNumberInput, 'Card number must be exactly 16 digits.');
        return false;
      }
      if (!isValidCardNumber(val)) {
        showFieldError(cardNumberInput, 'Please enter a valid card number.');
        return false;
      }

      showFieldSuccess(cardNumberInput);
      return true;
    };

    // Expiry date validation
    const validateExpiryDate = () => {
      if (codRadio && codRadio.checked) return true; // Skip if COD selected

      const val = expiryDateInput.value;

      if (!val.trim()) {
        showFieldError(expiryDateInput, 'Expiry date is required.');
        return false;
      }
      if (/[A-Za-z]/.test(val)) {
        showFieldError(expiryDateInput, 'Expiry date must be in MM / YY format.');
        return false;
      }

      const cleaned = val.replace(/\s/g, '').replace(/\//g, '');
      if (!/^\d{4}$/.test(cleaned)) {
        showFieldError(expiryDateInput, 'Please use MM / YY format.');
        return false;
      }

      const month = parseInt(cleaned.substring(0, 2), 10);
      if (month < 1 || month > 12) {
        showFieldError(expiryDateInput, 'Month must be between 01 and 12.');
        return false;
      }

      if (!isValidExpiry(val)) {
        showFieldError(expiryDateInput, 'Your card has expired.');
        return false;
      }

      showFieldSuccess(expiryDateInput);
      return true;
    };

    // CVV validation
    const validateCVV = () => {
      if (codRadio && codRadio.checked) return true; // Skip if COD selected

      const val = cvvInput.value.trim();

      if (!val) {
        showFieldError(cvvInput, 'CVV is required.');
        return false;
      }
      if (/[A-Za-z]/.test(val)) {
        showFieldError(cvvInput, 'CVV must contain numbers only.');
        return false;
      }
      if (/[^0-9]/.test(val)) {
        showFieldError(cvvInput, 'CVV cannot contain special characters.');
        return false;
      }
      if (!isValidCVV(val)) {
        showFieldError(cvvInput, 'CVV must be 3 or 4 digits.');
        return false;
      }

      showFieldSuccess(cvvInput);
      return true;
    };

    // Attach blur and input listeners
    emailInput.addEventListener('blur', validateCheckoutEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('field-invalid')) clearFieldState(emailInput);
    });

    firstNameInput.addEventListener('blur', validateFirstName);
    firstNameInput.addEventListener('input', () => {
      if (firstNameInput.classList.contains('field-invalid')) clearFieldState(firstNameInput);
    });

    lastNameInput.addEventListener('blur', validateLastName);
    lastNameInput.addEventListener('input', () => {
      if (lastNameInput.classList.contains('field-invalid')) clearFieldState(lastNameInput);
    });

    addressInput.addEventListener('blur', validateAddress);
    addressInput.addEventListener('input', () => {
      if (addressInput.classList.contains('field-invalid')) clearFieldState(addressInput);
    });

    cityInput.addEventListener('blur', validateCity);
    cityInput.addEventListener('input', () => {
      if (cityInput.classList.contains('field-invalid')) clearFieldState(cityInput);
    });

    stateInput.addEventListener('blur', validateState);
    stateInput.addEventListener('input', () => {
      if (stateInput.classList.contains('field-invalid')) clearFieldState(stateInput);
    });

    zipInput.addEventListener('blur', validateZip);
    zipInput.addEventListener('input', () => {
      if (zipInput.classList.contains('field-invalid')) clearFieldState(zipInput);
    });

    if (cardholderNameInput) {
      cardholderNameInput.addEventListener('blur', validateCardholderName);
      cardholderNameInput.addEventListener('input', () => {
        if (cardholderNameInput.classList.contains('field-invalid')) clearFieldState(cardholderNameInput);
      });
    }

    if (cardNumberInput) {
      cardNumberInput.addEventListener('blur', validateCardNumber);
      cardNumberInput.addEventListener('input', (e) => {
        if (cardNumberInput.classList.contains('field-invalid')) clearFieldState(cardNumberInput);

        // Auto-format card number with spaces
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = '';
        for (let i = 0; i < value.length && i < 16; i++) {
          if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
          }
          formattedValue += value[i];
        }
        e.target.value = formattedValue;
      });
    }

    if (expiryDateInput) {
      expiryDateInput.addEventListener('blur', validateExpiryDate);
      expiryDateInput.addEventListener('input', (e) => {
        if (expiryDateInput.classList.contains('field-invalid')) clearFieldState(expiryDateInput);

        // Auto-format expiry date with /
        let value = e.target.value.replace(/\s/g, '').replace(/\//g, '');
        if (value.length >= 2) {
          value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
        }
        e.target.value = value;
      });
    }

    if (cvvInput) {
      cvvInput.addEventListener('blur', validateCVV);
      cvvInput.addEventListener('input', (e) => {
        if (cvvInput.classList.contains('field-invalid')) clearFieldState(cvvInput);
        // Only allow numeric input
        e.target.value = e.target.value.replace(/\D/g, '');
      });

      // Show tooltip on focus
      cvvInput.addEventListener('focus', () => {
        let tooltip = cvvInput.parentElement.querySelector('.cvv-hint');
        if (!tooltip) {
          tooltip = document.createElement('div');
          tooltip.className = 'cvv-hint';
          tooltip.textContent = '3 digits on the back of your card (4 digits for Amex).';
          cvvInput.parentElement.appendChild(tooltip);
        }
      });

      cvvInput.addEventListener('blur', () => {
        const tooltip = cvvInput.parentElement.querySelector('.cvv-hint');
        if (tooltip && !cvvInput.classList.contains('field-invalid')) {
          setTimeout(() => tooltip.remove(), 200);
        }
      });
    }

    // Payment method toggle
    if (creditCardRadio && codRadio && creditCardForm) {
      creditCardRadio.addEventListener('change', () => {
        if (creditCardRadio.checked) {
          creditCardForm.style.display = 'block';
        }
      });

      codRadio.addEventListener('change', () => {
        if (codRadio.checked) {
          creditCardForm.style.display = 'none';
          // Clear card field errors when switching to COD
          if (cardholderNameInput) clearFieldState(cardholderNameInput);
          if (cardNumberInput) clearFieldState(cardNumberInput);
          if (expiryDateInput) clearFieldState(expiryDateInput);
          if (cvvInput) clearFieldState(cvvInput);
        }
      });
    }

    // Form submission
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (cart.length === 0) {
        showToast('Your cart is empty.');
        return;
      }

      // Validate all fields in order
      const validators = [
        { fn: validateCheckoutEmail, el: emailInput },
        { fn: validateFirstName, el: firstNameInput },
        { fn: validateLastName, el: lastNameInput },
        { fn: validateAddress, el: addressInput },
        { fn: validateCity, el: cityInput },
        { fn: validateState, el: stateInput },
        { fn: validateZip, el: zipInput }
      ];

      // Add card validators if credit card is selected
      if (creditCardRadio && creditCardRadio.checked) {
        validators.push(
          { fn: validateCardholderName, el: cardholderNameInput },
          { fn: validateCardNumber, el: cardNumberInput },
          { fn: validateExpiryDate, el: expiryDateInput },
          { fn: validateCVV, el: cvvInput }
        );
      }

      // Validate all fields
      for (const validator of validators) {
        if (!validator.fn()) {
          validator.el.focus();
          validator.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
      }

      // All valid - place order
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      if (submitBtn) setButtonLoading(submitBtn, 'Processing...');

      setTimeout(() => {
        showToast('Order placed successfully! Thank you for shopping with LUXE.');
        cart = [];
        currentDiscount = 0;
        saveCart();
        updateCart();
        setTimeout(() => {
          window.location.href = 'order-confirmation.html';
        }, 1500);
      }, 1000);
    });
  }

  // ========================================
  // FORGOT PASSWORD FORM VALIDATION
  // ========================================
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  if (forgotPasswordForm) {
    const emailInput = forgotPasswordForm.querySelector('#email');
    const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');

    // Email validation
    const validateForgotEmail = () => {
      const val = emailInput.value.trim();

      if (!val) {
        showFieldError(emailInput, 'Email address is required.');
        return false;
      }
      if (/\s/.test(emailInput.value)) {
        showFieldError(emailInput, 'Email cannot contain spaces.');
        return false;
      }
      if (!val.includes('@')) {
        showFieldError(emailInput, "Please include '@' in your email.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showFieldError(emailInput, 'Please enter a valid email address.');
        return false;
      }
      if (!isValidEmail(val)) {
        showFieldError(emailInput, 'Please use a permanent email address.');
        return false;
      }
      if (/^\d+@/.test(val)) {
        showFieldError(emailInput, 'Please enter a valid email address.');
        return false;
      }

      showFieldSuccess(emailInput);
      return true;
    };

    emailInput.addEventListener('blur', validateForgotEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('field-invalid')) clearFieldState(emailInput);
    });

    forgotPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForgotEmail()) {
        emailInput.focus();
        return;
      }

      // Valid - send reset link
      if (submitBtn) setButtonLoading(submitBtn, 'Sending Link...');

      setTimeout(() => {
        const email = emailInput.value.trim();

        // Create success message below form
        let successMsg = forgotPasswordForm.querySelector('.success-message');
        if (!successMsg) {
          successMsg = document.createElement('p');
          successMsg.className = 'success-message';
          forgotPasswordForm.appendChild(successMsg);
        }

        successMsg.textContent = `A reset link has been sent to ${email}. Check your spam folder if you don't see it.`;
        clearFieldState(emailInput);
        emailInput.value = '';

        // Re-enable button after 5 seconds with "Resend Link" text
        setTimeout(() => {
          resetButton(submitBtn, 'Resend Link');
        }, 5000);
      }, 1000);
    });
  }

  // ========================================
  // BACK TO TOP BUTTON
  // ========================================
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    let ticking = false;

    const handleScroll = () => {
      if (window.scrollY > 400) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
        setTimeout(() => {
          ticking = false;
        }, 100);
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Dynamic nav-link active state based on current URL
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (link.classList.contains('active') && href !== currentPage) {
      link.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const searchOverlay = document.getElementById('searchOverlay');
      if (searchOverlay && searchOverlay.classList.contains('open')) {
        toggleSearch();
      }
      const cartSidebar = document.getElementById('cartSidebar');
      if (cartSidebar && cartSidebar.classList.contains('open')) {
        toggleCart();
      }
    }
  });
});