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

// ===== BUG #3: renderProducts — broken ID selector =====
// getElementById('productsGrid') should find the element but
// we deliberately misspell the ID so it returns null and crashes
function renderProducts(list) {
  const grid = document.getElementById('productGrid'); // BUG: should be 'productsGrid'
  if (!grid) return; // silently fails — no products shown
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
              <button class="btn-wishlist"><i class="bi bi-heart"></i></button>
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

// ===== BUG #4: filterProducts — filter logic inverted =====
// Selecting "Women" shows Men + Accessories, etc.
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  // BUG: filter is inverted — shows everything EXCEPT the selected category
  const filtered = cat === 'all' ? products : products.filter(p => p.category !== cat);
  renderProducts(filtered);
}

// ===== BUG #5: addToCart — price stored as string causes wrong total =====
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    // BUG: price converted to string — cart total will be NaN or concatenated
    cart.push({ ...product, price: String(product.price), qty: 1 });
  }
  updateCart();
  showToast(`"${product.name}" added to bag`);
}

// ===== BUG #6: updateCart — cartCount ID is wrong =====
function updateCart() {
  const total = cart.reduce((s, c) => s + Number(c.price) * c.qty, 0);
  const count = cart.reduce((s, c) => s + c.qty, 0);

  // BUG: wrong element ID — badge never updates
  const countEl = document.getElementById('cartBadge'); // should be 'cartCount'
  if (countEl) countEl.textContent = count;

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
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  updateCart();
}

// ===== BUG #7: toggleCart — wrong element ID =====
function toggleCart() {
  // BUG: 'cartOverlay' and 'cartSidebar' IDs are correct in HTML
  // but toggling wrong class name breaks the open/close behaviour
  document.getElementById('cartOverlay').classList.toggle('active'); // BUG: should be 'open'
  document.getElementById('cartSidebar').classList.toggle('active'); // BUG: should be 'open'
}

// ===== BUG #8: toggleSearch — element ID mismatch =====
function toggleSearch() {
  // BUG: wrong ID
  const el = document.getElementById('searchBar'); // should be 'searchOverlay'
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
  let end = new Date();
  end.setHours(end.getHours() + 11, end.getMinutes() + 47, end.getSeconds() + 22);
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

renderProducts(products);
startCountdown();
