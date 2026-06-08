/* =========================================
   LUXE — Premium Fashion Store
   script.js
   ========================================= */

const products = [
  { id:1, name:"Silk Drape Midi Dress", cat:"Women", price:8500, oldPrice:null, badge:"new", rating:5, reviews:24, img:"https://images.unsplash.com/photo-1566479179817-634ff36f6875?w=400&q=80", category:"women" },
  { id:2, name:"Structured Blazer", cat:"Women", price:12000, oldPrice:16000, badge:"sale", rating:4, reviews:18, img:"https://images.unsplash.com/photo-1594938298603-c8148c4b4e7e?w=400&q=80", category:"women" },
  { id:3, name:"Slim Fit Linen Suit", cat:"Men", price:18500, oldPrice:null, badge:"new", rating:5, reviews:11, img:"https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=80", category:"men" },
  { id:4, name:"Premium Leather Tote", cat:"Accessories", price:9200, oldPrice:13000, badge:"sale", rating:5, reviews:32, img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", category:"accessories" },
  { id:5, name:"Floral Wrap Dress", cat:"Women", price:6800, oldPrice:null, badge:null, rating:4, reviews:15, img:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80", category:"women" },
  { id:6, name:"Oxford Shirt — Classic", cat:"Men", price:4200, oldPrice:null, badge:null, rating:4, reviews:29, img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80", category:"men" },
  { id:7, name:"Gold Chain Bracelet", cat:"Accessories", price:3500, oldPrice:5000, badge:"sale", rating:5, reviews:42, img:"https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=400&q=80", category:"accessories" },
  { id:8, name:"Cashmere Oversized Coat", cat:"Women", price:24000, oldPrice:null, badge:"new", rating:5, reviews:8, img:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80", category:"women" },
];

let cart = [];

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
          <div class="product-img-wrap">
            ${badgeHtml}
            <img src="${p.img}" alt="${p.name}">
            <div class="product-actions">
              <button class="btn-add-cart" onclick="addToCart(${p.id})">Add to Bag</button>
              <button class="btn-wishlist" onclick="toggleWishlist(${p.id})"><i class="bi bi-heart"></i></button>
            </div>
          </div>
          <div class="product-info">
            <div class="product-cat">${p.cat}</div>
            <h5>${p.name}</h5>
            <div class="product-price">${oldPriceHtml}Rs. ${p.price.toLocaleString()}</div>
            <div class="product-rating"><span class="stars">${stars}</span><span>(${p.reviews})</span></div>
          </div>
        </div>
      </div>`;
  });
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
  renderProducts(filtered);
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
              <button class="qty-btn" onclick="changeQty(${c.id},-1)">−</button>
              <span style="font-size:14px; min-width:20px; text-align:center">${c.qty}</span>
              <button class="qty-btn" onclick="changeQty(${c.id},1)">+</button>
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
  showToast(`"${product.name}" saved to wishlist`);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  startCountdown();
  updateCart();

  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          showToast(`Searching for "${query}"...`);
          e.target.value = '';
          toggleSearch();
        }
      }
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      if (email) {
        showToast('Subscribed successfully!');
        e.target.reset();
      }
    });
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href') === '#') {
      e.preventDefault();
      const aria = link.getAttribute('aria-label');
      if (aria === 'Account' || aria === 'Wishlist' || link.textContent.trim() === 'Load More Products') {
        showToast(`${aria || 'Feature'} coming soon`);
      }
    }
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
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