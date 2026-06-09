/* =========================================
   LUXE — Premium Fashion Store
   script.js
   ========================================= */

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
          <a href="product.html?id=${p.id}" style="display: block;">
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
            <a href="product.html?id=${p.id}" style="color: inherit; text-decoration: none;">
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
          <a href="product.html?id=${p.id}" style="display: block;">
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
            <a href="product.html?id=${p.id}" style="color: inherit; text-decoration: none;">
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
      completionMsg.style.cssText = 'color: var(--muted); font-size: 14px; text-align: center; margin-top: 16px; display: none;';
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
          <a href="product.html?id=${p.id}" style="display: block;">
            <div class="product-img-wrap">
              <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
          </a>
          <div class="product-actions">
            <button class="btn-add-cart js-add-cart" data-id="${p.id}">Add to Bag</button>
            <button class="btn-wishlist js-wishlist" data-id="${p.id}" style="color: var(--danger);" aria-label="Remove ${p.name} from wishlist"><i class="bi bi-heart-fill"></i></button>
          </div>
          <div class="product-info">
            <div class="product-cat">${p.cat}</div>
            <a href="product.html?id=${p.id}" style="color: inherit; text-decoration: none;">
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
        <div style="font-size: 14px; font-weight: 500;">
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
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    orderNumberEl.textContent = '#LX-' + randomNum;
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query.length < 3) {
          showToast('Please enter at least 3 characters to search.');
        } else {
          // Filter products based on search query
          const results = products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.cat.toLowerCase().includes(query.toLowerCase())
          );

          // Store query and results in sessionStorage
          sessionStorage.setItem('luxe_search_query', query);
          sessionStorage.setItem('luxe_search_results', JSON.stringify(results));

          // Redirect to search page
          window.location.href = 'search.html';
        }
      }
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const msgDiv = document.getElementById('newsletterMsg');
      const email = emailInput.value.trim();
      
      if (!email) {
        if (msgDiv) { msgDiv.textContent = 'Please enter an email address.'; msgDiv.style.color = '#e74c3c'; }
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (msgDiv) { msgDiv.textContent = 'Please enter a valid email address.'; msgDiv.style.color = '#e74c3c'; }
      } else {
        if (msgDiv) { msgDiv.textContent = 'Successfully subscribed to the LUXE Circle!'; msgDiv.style.color = '#C9A96E'; }
        emailInput.value = '';
        showToast('Subscribed successfully!');
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

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Simulate sending
      showToast('Thank you! Your message has been sent successfully.');
      contactForm.reset();
    });
  }

  // Login Form Handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Successfully signed in. Redirecting...');
      setTimeout(() => window.location.href = 'index.html', 1500);
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

  // Checkout Form Submission
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        showToast('Your cart is empty.');
        return;
      }
      showToast('Order placed successfully! Thank you for shopping with LUXE.');
      cart = [];
      currentDiscount = 0;
      saveCart();
      updateCart();
      checkoutForm.reset();
      setTimeout(() => {
        window.location.href = 'order-confirmation.html';
      }, 2000);
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