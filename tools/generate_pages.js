const fs = require('fs');

const pages = [
  { name: 'collections', title: 'Collections', desc: 'Explore all our carefully curated collections.' },
  { name: 'women', title: 'Women', desc: "Elegance and grace. Shop the latest women's fashion." },
  { name: 'men', title: 'Men', desc: 'Contemporary and classic menswear for every occasion.' },
  { name: 'accessories', title: 'Accessories', desc: 'The perfect finishing touches for your luxury ensemble.' },
  { name: 'sale', title: 'Sale', desc: 'Exclusive pieces at exceptional prices. Limited time only.' }
];

const html = fs.readFileSync('index.html', 'utf8');

pages.forEach(page => {
  let content = html;
  
  // Update Title
  content = content.replace('<title>LUXE — Premium Fashion Store</title>', `<title>LUXE — ${page.title}</title>`);
  
  // Update Active Nav Link
  content = content.replace('<a class="nav-link active" href="index.html">Home</a>', '<a class="nav-link" href="index.html">Home</a>');
  content = content.replace(`<a class="nav-link" href="${page.name}.html">${page.title}</a>`, `<a class="nav-link active" href="${page.name}.html">${page.title}</a>`);
  
  // Build the new Page Hero and Breadcrumb
  const pageHero = `<!-- PAGE HERO -->
<section class="page-hero">
  <div class="container-xl">
    <div class="section-label">Luxe ${page.title}</div>
    <h1 class="page-hero-title">${page.title}</h1>
    <p class="page-hero-subtitle">${page.desc}</p>
  </div>
</section>

<!-- BREADCRUMB -->
<div class="page-breadcrumb">
  <div class="container-xl">
    <a href="index.html">Home</a>
    <span class="mx-2 text-muted">/</span>
    <span>${page.title}</span>
  </div>
</div>`;

  // Replace everything from HERO SECTION up to PRODUCTS with the new pageHero
  content = content.replace(/<!-- HERO SECTION -->[\s\S]*?<!-- PRODUCTS -->/, pageHero + '\n\n<!-- PRODUCTS -->');

  // Remove everything from PROMO BANNER down to NEWSLETTER
  content = content.replace(/<!-- PROMO BANNER -->[\s\S]*?<!-- NEWSLETTER -->/, '<!-- NEWSLETTER -->');

  // Change the "Curated For You" label in products section to the page title
  content = content.replace('<div class="section-label">Curated For You</div>', `<div class="section-label">${page.title} Category</div>`);
  content = content.replace('<h2 class="section-title">Featured Products</h2>', `<h2 class="section-title">${page.title}</h2>`);

  // We write to the current directory assuming the script is run from the project root
  fs.writeFileSync(`${page.name}.html`, content);
});

console.log('Category pages generated successfully.');
