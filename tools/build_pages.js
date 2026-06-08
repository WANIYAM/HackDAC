const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const contactContent = `
<!-- CONTACT SECTION -->
<section class="contact-section">
  <div class="container-xl">
    <div class="row g-5">
      <div class="col-lg-5">
        <div class="contact-info">
          <div class="section-label">Get In Touch</div>
          <h3>We'd love to hear from you.</h3>
          <p>Whether you have a question about our collections, sizing, or an existing order, our team is here to help.</p>
        </div>
        <div class="mb-4">
          <h6 class="contact-info-heading">Customer Care</h6>
          <p class="text-muted"><a href="mailto:hello@luxe.pk" class="contact-link">hello@luxe.pk</a><br>
          <a href="tel:+923001234567" class="contact-link">+92 300 1234567</a></p>
        </div>
        <div>
          <h6 class="contact-info-heading">Visit Us</h6>
          <p class="text-muted">123 Fashion St,<br>Karachi, Pakistan</p>
        </div>
      </div>
      <div class="col-lg-7">
        <form id="contactForm" class="contact-form">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="contactName" class="visually-hidden">Name</label>
              <input type="text" class="form-control" id="contactName" placeholder="Your Name" required minlength="2">
            </div>
            <div class="col-md-6">
              <label for="contactEmail" class="visually-hidden">Email</label>
              <input type="email" class="form-control" id="contactEmail" placeholder="Your Email" required>
            </div>
            <div class="col-12">
              <label for="contactSubject" class="visually-hidden">Subject</label>
              <input type="text" class="form-control" id="contactSubject" placeholder="Subject" required>
            </div>
            <div class="col-12">
              <label for="contactMessage" class="visually-hidden">Message</label>
              <textarea class="form-control" id="contactMessage" rows="5" placeholder="Your Message" required minlength="10"></textarea>
            </div>
            <div class="col-12">
              <button type="submit" class="btn-submit">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
`;

const aboutContent = `
<!-- ABOUT SECTION -->
<section class="contact-section">
  <div class="container-xl">
    <div class="row align-items-center g-5">
      <div class="col-lg-6">
        <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80" alt="About LUXE" class="arrival-img-large" loading="lazy">
      </div>
      <div class="col-lg-6 px-lg-5">
        <div class="section-label">Our Story</div>
        <h2 class="about-heading">Redefining Elegance Since 2017</h2>
        <p class="about-text">LUXE was born out of a profound passion for exquisite craftsmanship and timeless fashion. What started as a small boutique in Karachi has grown into a premier destination for those who seek style that transcends the ordinary.</p>
        <p class="about-text">Our philosophy is simple: we believe that luxury is not just about the price tag, but the meticulous attention to detail, the quality of materials, and the confidence it instills in the wearer. Every piece in our collection is curated to tell a unique story.</p>
      </div>
    </div>
  </div>
</section>
`;

let contactPage = html;
contactPage = contactPage.replace('<title>LUXE — Premium Fashion Store</title>', '<title>LUXE — Contact</title>');
contactPage = contactPage.replace('<a class="nav-link active" href="index.html">Home</a>', '<a class="nav-link" href="index.html">Home</a>');
contactPage = contactPage.replace(/<!-- HERO SECTION -->[\s\S]*?<!-- NEWSLETTER -->/, contactContent + '\n\n<!-- NEWSLETTER -->');
fs.writeFileSync('contact.html', contactPage);

let aboutPage = html;
aboutPage = aboutPage.replace('<title>LUXE — Premium Fashion Store</title>', '<title>LUXE — About Us</title>');
aboutPage = aboutPage.replace('<a class="nav-link active" href="index.html">Home</a>', '<a class="nav-link" href="index.html">Home</a>');
aboutPage = aboutPage.replace(/<!-- HERO SECTION -->[\s\S]*?<!-- NEWSLETTER -->/, aboutContent + '\n\n<!-- NEWSLETTER -->');
fs.writeFileSync('about.html', aboutPage);

console.log('Contact and About pages generated.');
