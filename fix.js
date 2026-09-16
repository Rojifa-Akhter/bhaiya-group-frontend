const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Also need the intersection observer logic for animate-on-scroll-wrapper
// Let's check if it exists in index.html
if (!html.includes('animate-on-scroll-wrapper.forEach')) {
    const script = `
    <!-- Scroll Animation Observer -->
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        var animateWrappers = document.querySelectorAll('.animate-on-scroll-wrapper');
        var animateObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            } else {
              entry.target.classList.remove('is-visible');
            }
          });
        }, { threshold: 0.1 });
        animateWrappers.forEach(function (el) {
          animateObserver.observe(el);
        });
      });
    </script>
    `;
    html = html.replace('</body>', script + '\n</body>');
}

fs.writeFileSync('index.html', html);
console.log("Done");
