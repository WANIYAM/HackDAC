# Complete Inline CSS Cleanup Plan

## Overview
This plan outlines a complete refactoring of inline styles across all 22 HTML files and js/script.js. We will move 171+ inline style attributes to proper CSS classes in css/style.css, organized into 34 labeled sections.

## Current State Analysis

### Inline Styles by File
- **shipping-info.html**: 29 inline styles (highest)
- **checkout.html**: 13 inline styles
- **sustainability.html**: 13 inline styles
- **order-confirmation.html**: 12 inline styles
- **terms-of-service.html**: 12 inline styles
- **privacy-policy.html**: 11 inline styles
- **product.html**: 11 inline styles
- **account.html**: 9 inline styles
- **faq.html**: 9 inline styles
- **search.html**: 9 inline styles
- **careers.html**: 10 inline styles
- **forgot-password.html**: 6 inline styles
- **shipping-returns.html**: 5 inline styles
- **wishlist.html**: 4 inline styles
- **index.html**: 4 inline styles
- **women.html, men.html, accessories.html, sale.html, collections.html**: 2 each
- **about.html, contact.html**: 2 each

### Common Inline Style Patterns Identified

1. **Product Card Links**: `style="display: block;"` or `style="text-decoration: none; color: inherit; display: block;"`
2. **Page Hero Backgrounds**: `style="background-image: url(...)"`
3. **Heading Overrides**: Font-family, font-size, font-weight, margin overrides
4. **Centered Elements**: `style="max-width: ...; margin: 0 auto; text-align: center;"`
5. **Text Utilities**: `style="font-size: ...; color: ..."`
6. **Image Sizing**: `style="width: 100%; aspect-ratio: 3/4; object-fit: cover;"`
7. **JavaScript-generated styles**: Multiple instances in js/script.js

### JavaScript Inline Styles Analysis
Located in **js/script.js**:
- Lines 196, 208, 229, 241, 504, 511, 515: Product card link styles
- Line 305-307: Pagination completion message (cssText)
- Line 367: Cart count display toggle
- Lines 381, 385, 386: Cart display toggles
- Line 709: Newsletter message color
- Line 1162: Promo container display toggle
- Line 1595: CVV hint tooltip inline styles

## Implementation Strategy

### Phase 1: Create New CSS Classes (Batch 1 - Common Utilities)

**New classes to add to css/style.css:**

```css
/* Product card link wrapper */
.product-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

/* Centered content with max-width */
.centered-content {
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
}

/* Product detail image */
.product-detail-img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
}

/* Product name heading (product.html) */
.product-detail-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 42px;
  font-weight: 300;
  margin-bottom: 16px;
}

/* Product description heading */
.product-section-heading {
  font-weight: 500;
  margin-bottom: 12px;
}

/* Checkout back link */
.checkout-back-link {
  text-decoration: none;
  font-size: 14px;
  color: var(--dark);
}

/* Checkout navbar brand override */
.checkout-brand {
  font-size: 32px;
}

/* Checkout container max-width */
.checkout-container {
  max-width: 1000px;
}

/* Page hero with background image */
.page-hero-with-bg {
  background-size: cover;
  background-position: center;
}

/* Recommended section - reduced top padding */
.recommended-section {
  padding-top: 0;
}

/* Pagination completion message */
.pagination-complete-msg {
  color: var(--muted);
  font-size: 14px;
  text-align: center;
  margin-top: 16px;
  display: none;
}

/* CVV tooltip hint */
.cvv-hint {
  font-size: 11px;
  color: var(--muted);
  margin-top: 4px;
}

/* Success message (forgot password) */
.success-message {
  color: var(--gold);
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
  line-height: 1.6;
}

/* Promo toggle container */
.promo-toggle-container {
  display: none;
}

/* Newsletter success color override */
.newsletter-msg-success {
  color: var(--gold);
}

/* Empty wishlist message */
.empty-wishlist-msg {
  text-align: center;
  padding: 80px 20px;
  color: var(--muted);
}

/* Wishlist heart icon filled */
.wishlist-heart-filled {
  color: var(--danger);
}

/* Checkout order summary font size */
.order-summary-price {
  font-size: 14px;
  font-weight: 500;
}
```

### Phase 2: Extract Inline Styles from Each HTML File

**Systematic approach per file:**

#### index.html (4 inline styles)
- Line 271, 281, 291: Product card links → `.product-link`
- Line 381: Newsletter error span → `.centered-content`

#### women.html, men.html, accessories.html, sale.html (2 each)
- Hero background image → `.page-hero-with-bg` + inline `background-image` via style attribute (keep as dynamic)
- Newsletter error span → `.centered-content`

#### product.html (11 inline styles)
- Line 83: Product image → `.product-detail-img`
- Line 89: Product name → `.product-detail-title`
- Line 132: Description heading → `.product-section-heading`
- Line 142: Recommended section → `.recommended-section`

#### checkout.html (13 inline styles)
- Line 27: Back link → `.checkout-back-link`
- Line 28: Brand override → `.checkout-brand`
- Line 37: Container max-width → `.checkout-container`
- Line 552: Order summary price → `.order-summary-price`

#### shipping-info.html (29 inline styles - highest priority)
- Extract all heading font sizes, margins, paddings, and text colors
- Create specific classes: `.shipping-heading`, `.shipping-subheading`, `.shipping-info-box`, etc.

#### Other files (about, contact, careers, faq, account, etc.)
- Similar systematic extraction following the same pattern
- Create semantic class names based on element purpose

### Phase 3: Update JavaScript (js/script.js)

**Replace inline style assignments:**

1. **Lines 196, 208, 229, 241, 504, 511, 515** - Product card links:
   ```javascript
   // BEFORE:
   <a href="product.html?id=${p.id}" style="display: block;">
   
   // AFTER:
   <a href="product.html?id=${p.id}" class="product-link">
   ```

2. **Line 305-307** - Pagination message:
   ```javascript
   // BEFORE:
   completionMsg.style.cssText = 'color: var(--muted); font-size: 14px; text-align: center; margin-top: 16px; display: none;';
   
   // AFTER:
   completionMsg.className = 'pagination-complete-msg';
   ```

3. **Line 367** - Cart count display (KEEP - permitted exception):
   ```javascript
   countEl.style.display = count > 0 ? 'flex' : 'none';
   ```

4. **Lines 381, 385, 386** - Cart display toggles (KEEP - permitted exception):
   ```javascript
   if (emptyCart) emptyCart.style.display = 'block';
   if (cartFooter) cartFooter.style.display = 'none';
   ```

5. **Line 423** - Body overflow (KEEP - permitted exception):
   ```javascript
   document.body.style.overflow = isOpen ? 'hidden' : '';
   ```

6. **Line 709** - Newsletter message color:
   ```javascript
   // BEFORE:
   msgDiv.style.color = '#C9A96E';
   
   // AFTER:
   msgDiv.classList.add('newsletter-msg-success');
   ```

7. **Line 1162** - Promo container toggle (KEEP - permitted exception):
   ```javascript
   promoContainer.style.display = promoContainer.style.display === 'none' ? 'block' : 'none';
   ```

8. **Line 1595** - CVV hint tooltip:
   ```javascript
   // BEFORE:
   tooltip.style.cssText = 'font-size: 11px; color: var(--muted); margin-top: 4px;';
   
   // AFTER:
   tooltip.className = 'cvv-hint';
   ```

9. **Line 1750** - Forgot password success message:
   ```javascript
   // BEFORE:
   successMsg.style.cssText = 'color: #C9A96E; font-size: 14px; margin-top: 20px; text-align: center; line-height: 1.6;';
   
   // AFTER:
   successMsg.className = 'success-message';
   ```

### Phase 4: Reorganize css/style.css into 34 Sections

**New structure:**

```css
/* =========================================
   LUXE — Premium Fashion Store
   style.css
   ========================================= */

/* =========================================
   1. CSS VARIABLES
   ========================================= */
:root { ... }

/* =========================================
   2. RESET & BASE STYLES
   ========================================= */
* { ... }
body { ... }
h1, h2, h3, h4, h5 { ... }

/* =========================================
   3. UTILITY CLASSES
   ========================================= */
.text-gold { ... }
.section-label { ... }
.btn-gold { ... }
.btn-outline-gold { ... }
.btn-load-more { ... }
.btn-submit { ... }
.view-all-link { ... }
.product-link { ... }
.centered-content { ... }
/* ... all shared utilities */

/* =========================================
   4. ANNOUNCEMENT BAR
   ========================================= */
.announcement-bar { ... }

/* =========================================
   5. NAVBAR & NAVIGATION
   ========================================= */
.navbar { ... }
.navbar-brand { ... }
.nav-link { ... }
/* ... all nav styles */

/* =========================================
   6. SEARCH OVERLAY
   ========================================= */
.search-overlay { ... }

/* =========================================
   7. HERO SECTION
   ========================================= */
.hero { ... }
.hero-bg { ... }
.hero-pattern { ... }
/* ... all hero styles */

/* =========================================
   8. FEATURE STRIP
   ========================================= */
.feature-strip { ... }

/* =========================================
   9. CATEGORIES SECTION
   ========================================= */
.categories-section { ... }
.category-card { ... }

/* =========================================
   10. PRODUCTS SECTION & PRODUCT CARDS
   ========================================= */
.products-section { ... }
.product-card { ... }
.product-img { ... }
/* ... all product styles */

/* =========================================
   11. PROMO BANNER & COUNTDOWN
   ========================================= */
.promo-section { ... }
.promo-card { ... }
.promo-countdown { ... }

/* =========================================
   12. NEW ARRIVALS SECTION
   ========================================= */
.new-arrivals-section { ... }
.arrival-item { ... }

/* =========================================
   13. TESTIMONIALS SECTION
   ========================================= */
.testimonials-section { ... }
.testimonial-card { ... }

/* =========================================
   14. BRANDS SECTION
   ========================================= */
.brands-section { ... }
.brand-logo-text { ... }

/* =========================================
   15. NEWSLETTER SECTION
   ========================================= */
.newsletter-section { ... }
.newsletter-form { ... }

/* =========================================
   16. FOOTER
   ========================================= */
footer { ... }
.footer-brand { ... }

/* =========================================
   17. CART SIDEBAR
   ========================================= */
.cart-overlay { ... }
.cart-sidebar { ... }

/* =========================================
   18. TOAST NOTIFICATION
   ========================================= */
.toast-msg { ... }

/* =========================================
   19. PAGE HERO (CATEGORY/INNER PAGES)
   ========================================= */
.page-hero { ... }
.page-hero-bg { ... }
.page-hero-with-bg { ... }

/* =========================================
   20. BREADCRUMB
   ========================================= */
.page-breadcrumb { ... }

/* =========================================
   21. CONTACT & ABOUT PAGES
   ========================================= */
.contact-section { ... }
.contact-info { ... }
.about-heading { ... }

/* =========================================
   22. PRODUCT DETAIL PAGE
   ========================================= */
.product-detail-img { ... }
.product-detail-title { ... }
.product-section-heading { ... }
.recommended-section { ... }

/* =========================================
   23. SEARCH RESULTS PAGE
   ========================================= */
/* (Add any search-specific styles here) */

/* =========================================
   24. CHECKOUT PAGE
   ========================================= */
.checkout-section { ... }
.checkout-card { ... }
.checkout-back-link { ... }
.checkout-brand { ... }
.checkout-container { ... }

/* =========================================
   25. ORDER CONFIRMATION PAGE
   ========================================= */
/* (Add any order-confirmation-specific styles here) */

/* =========================================
   26. ACCOUNT & FORGOT PASSWORD PAGES
   ========================================= */
.success-message { ... }

/* =========================================
   27. WISHLIST PAGE
   ========================================= */
.empty-wishlist-msg { ... }
.wishlist-heart-filled { ... }

/* =========================================
   28. FAQ & ACCORDION
   ========================================= */
/* (Add any FAQ-specific styles here) */

/* =========================================
   29. CAREERS PAGE
   ========================================= */
/* (Add any careers-specific styles here) */

/* =========================================
   30. SUSTAINABILITY PAGE
   ========================================= */
/* (Add any sustainability-specific styles here) */

/* =========================================
   31. SHIPPING & RETURNS PAGES
   ========================================= */
/* (Add shipping-info and shipping-returns styles here) */

/* =========================================
   32. LEGAL PAGES (PRIVACY, TERMS)
   ========================================= */
/* (Add legal page-specific styles here) */

/* =========================================
   33. FORM VALIDATION STYLES
   ========================================= */
.field-error { ... }
.field-success { ... }
.field-invalid { ... }
.input-wrapper { ... }
.char-counter { ... }
.cvv-hint { ... }

/* =========================================
   34. RESPONSIVE / MEDIA QUERIES
   ========================================= */
@media (max-width: 991px) { ... }
@media (max-width: 768px) { ... }

@keyframes fadeInOut { ... }
```

### Phase 5: File-by-File Cleanup Checklist

For each HTML file, perform:
1. ✅ Remove all `style=""` attributes
2. ✅ Replace with appropriate CSS classes
3. ✅ Remove empty `class=""` attributes if any
4. ✅ Remove commented-out HTML (if irrelevant)
5. ✅ Ensure consistent 2-space indentation
6. ✅ Verify no duplicate IDs on the same page
7. ✅ Remove unused IDs not referenced in JS

### Phase 6: Verification Strategy

After all changes:

1. **Visual regression testing** - Load each of the 22 pages and compare before/after screenshots
2. **Browser DevTools inspection** - Verify no inline styles remain (except those in JS for dynamic behavior)
3. **CSS validation** - Ensure no duplicate selectors in style.css
4. **Functional testing**:
   - Cart add/remove works
   - Wishlist toggle works
   - Search functionality works
   - Form validation displays correctly
   - Pagination "Load More" works
   - Newsletter subscription works
   - Checkout form works
   - Size selector works
   - Quantity controls work

### Known Exceptions (Permitted Inline Styles)

These inline styles will remain in JavaScript:

1. **Display toggles** - `element.style.display = 'none'` or `'block'` or `'flex'`
2. **Body overflow lock** - `document.body.style.overflow = 'hidden'` (for cart/search overlay)
3. **Dynamic background images** - Hero backgrounds set from data attributes
4. **Computed values** - Any styles calculated at runtime based on measurements

## Risk Mitigation

1. **Backup**: Current state is already in git
2. **Incremental approach**: Work file-by-file, commit after each
3. **Testing between steps**: Load pages in browser after each file change
4. **Rollback plan**: Use git to revert if visual issues occur

## Success Criteria

- ✅ Zero inline `style=""` attributes in all HTML files (except dynamic background images)
- ✅ Zero `<style>` blocks in any HTML file
- ✅ All JS-generated HTML uses CSS classes instead of inline styles (with noted exceptions)
- ✅ css/style.css organized into 34 clearly labeled sections
- ✅ No duplicate CSS rules
- ✅ All 22 pages look visually identical to before
- ✅ All interactive features work as before
- ✅ Code is clean, consistent, and maintainable

## Estimated Complexity

- **Files to modify**: 23 (22 HTML + 1 JS + 1 CSS)
- **Inline styles to extract**: ~171 in HTML + ~15 in JS = ~186 total
- **New CSS classes to create**: ~40-50
- **CSS sections to organize**: 34
- **Risk level**: Medium (pure refactoring, no new features, but high attention to detail required)
