# CSS Classes Design Document

## Inline Style Patterns Identified (111 total)

### 1. Background Images (Page Heroes) - ~22 occurrences
**Pattern:** `style="background-image: url('...')"`
**Solution:** Use CSS custom property approach with page-specific classes

```css
/* Base class in CSS */
.page-hero-bg-about { background-image: url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80'); }
.page-hero-bg-account { background-image: url('https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&q=80'); }
.page-hero-bg-careers { background-image: url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80'); }
.page-hero-bg-contact { background-image: url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1200&q=80'); }
.page-hero-bg-faq { background-image: url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80'); }
.page-hero-bg-forgot { background-image: url('https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1200&q=80'); }
.page-hero-bg-privacy { background-image: url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80'); }
.page-hero-bg-search { background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80'); }
.page-hero-bg-shipping { background-image: url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=80'); }
.page-hero-bg-sustainability { background-image: url('https://images.unsplash.com/photo-1542601906897-eabf761d7e92?w=1200&q=80'); }
.page-hero-bg-terms { background-image: url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1200&q=80'); }
.page-hero-bg-wishlist { background-image: url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80'); }
.page-hero-bg-women { background-image: url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80'); }
.page-hero-bg-men { background-image: url('https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80'); }
.page-hero-bg-accessories { background-image: url('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80'); }
.page-hero-bg-collections { background-image: url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80'); }
.page-hero-bg-sale { background-image: url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80'); }
```

### 2. Typography - Headings (~40 occurrences)

**Pattern:** `style="font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400;"`

```css
/* Serif headings */
.heading-xlg { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 400; margin-bottom: 16px; }
.heading-lg { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; }
.heading-md { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 400; margin-top: 40px; margin-bottom: 16px; }
.heading-md-alt { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 500; margin-bottom: 0; }
.heading-sm { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 500; margin-top: 32px; margin-bottom: 16px; }

/* Section dividers */
.section-heading-divider { font-size: 28px; padding-bottom: 16px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
```

### 3. Typography - Text (~15 occurrences)

```css
.text-xs { font-size: 13px; }
.text-sm { font-size: 14px; }
.text-legal-note { margin-top: 40px; font-style: italic; color: var(--muted); }
```

### 4. Links (~10 occurrences)

```css
.link-dark-bold { color: var(--dark); font-weight: 500; text-decoration: none; }
.link-dark-bold-underline { color: var(--dark); font-weight: 500; }
.link-muted-sm { color: var(--muted); font-size: 13px; text-decoration: none; }
```

### 5. Buttons (~5 occurrences)

```css
.btn-uppercase { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
.btn-styled { background: none; border: none; padding: 0; cursor: pointer; }
.btn-min-width { min-width: 180px; }
```

### 6. Layout Containers (~8 occurrences)

```css
.container-narrow { max-width: 500px; margin: 0 auto; }
.container-medium { max-width: 520px; margin: 0 auto; }
.section-min-height-50 { min-height: 50vh; }
.section-min-height-60 { min-height: 60vh; padding: 80px 0; display: flex; align-items: center; }
```

### 7. Icons (~8 occurrences)

```css
.icon-xlg { font-size: 64px; }
.icon-lg { font-size: 48px; }
.icon-md { font-size: 3rem; }
.icon-gold { color: var(--gold); }
.icon-muted { color: var(--muted); }
.icon-with-margin { margin-bottom: 24px; }
.icon-block { display: block; }
```

### 8. Spacing Utilities

```css
.mt-12 { margin-top: 12px; }
.mt-16 { margin-bottom: 16px; }
.mb-16 { margin-bottom: 16px; }
.pb-16 { padding-bottom: 16px; }
```

### 9. Form Elements

```css
.field-error-centered { max-width: 520px; margin: 0 auto; text-align: center; }
```

### 10. Specific Component Styles

**Search page:**
```css
.search-section { padding: 40px 0 20px; }
.search-form-input { width: 100%; padding: 16px 50px 16px 20px; border: 1px solid var(--border); font-size: 16px; font-family: 'Outfit', sans-serif; }
.search-form-btn { position: absolute; right: 0; top: 0; height: 100%; border: none; background: transparent; padding: 0 20px; cursor: pointer; }
.search-icon-lg { font-size: 20px; }
.search-empty-state { padding: 80px 0; }
```

**Order confirmation:**
```css
.order-confirmation-section { min-height: 60vh; padding: 80px 0; display: flex; align-items: center; }
.order-number-box { background: #f8f8f8; border: 1px solid var(--border); padding: 24px; margin: 32px 0; border-radius: 4px; }
.order-number-label { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
.order-number-value { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 500; color: var(--gold); margin: 0; }
.order-confirmation-footer { border-top: 1px solid var(--border); padding: 32px 0; background: #fff; }
.order-confirmation-footer-text { margin: 0; color: var(--muted); font-size: 14px; }
.navbar-back-link { text-decoration: none; font-size: 14px; }
.navbar-brand-lg { font-size: 32px; }
```

**Sustainability page:**
```css
.sustainability-section { background: #fff; padding: 80px 0; }
.sustainability-stat-number { font-size: 64px; color: var(--gold); margin-bottom: 24px; }
.sustainability-stat-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 500; margin-bottom: 16px; }
```

**FAQ & Shipping-Returns CTA boxes:**
```css
.cta-box-gold { border: 2px solid var(--gold); padding: 48px 32px; margin-top: 64px; }
.cta-box-gold-no-margin { border: 2px solid var(--gold); padding: 48px 32px; }
```

**Wishlist:**
```css
.wishlist-empty-icon { font-size: 3rem; color: var(--border); margin-bottom: 1rem; display: block; }
.wishlist-explore-btn { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
```

**Careers badges:**
```css
.career-badge { font-size: 12px; padding: 6px 12px; }
```

**Account page:**
```css
.account-signup-text { font-size: 13px; color: var(--muted); }
.account-create-btn { font-size: 14px; }
```

**Checkout promo:**
```css
.promo-container-visible { margin-top: 12px; }
```

### 11. JavaScript Generated HTML

**renderWishlist function (lines 504, 515):**
```javascript
// Current:
<a href="product.html?id=${p.id}" style="display: block;">
<a href="product.html?id=${p.id}" style="color: inherit; text-decoration: none;">

// Replace with:
<a href="product.html?id=${p.id}" class="product-link-block">
<a href="product.html?id=${p.id}" class="product-link">
```

**CSS:**
```css
.product-link-block { display: block; }
/* .product-link already exists in current CSS */
```

## Implementation Summary

**Total new classes to add:** ~60-70
**HTML files to update:** 22
**JavaScript template strings to update:** 2

All inline styles will be removed and replaced with semantic, reusable CSS classes organized in style.css.
