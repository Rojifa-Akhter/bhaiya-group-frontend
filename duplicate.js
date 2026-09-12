const fs = require('fs');
let html = fs.readFileSync('pages/concerns-details.html', 'utf8');

// For Brands
let brandsStart = html.indexOf('<!-- Card 1 -->');
let brandsEnd = html.indexOf('</div>\n          <div class="swiper-pagination brands-pagination">');
if (brandsStart !== -1 && brandsEnd !== -1) {
    let brandsCards = html.substring(brandsStart, brandsEnd);
    let newBrandsCards = brandsCards + '\n            <!-- CLONED BRANDS -->\n            ' + brandsCards;
    html = html.substring(0, brandsStart) + newBrandsCards + html.substring(brandsEnd);
}

// For Countries
let countriesStart = html.indexOf('<!-- Card 1 -->', brandsEnd);
let countriesEnd = html.indexOf('</div>\n          <div class="swiper-pagination countries-pagination">');
if (countriesStart !== -1 && countriesEnd !== -1) {
    let countriesCards = html.substring(countriesStart, countriesEnd);
    let newCountriesCards = countriesCards + '\n            <!-- CLONED COUNTRIES -->\n            ' + countriesCards;
    html = html.substring(0, countriesStart) + newCountriesCards + html.substring(countriesEnd);
}

fs.writeFileSync('pages/concerns-details.html', html);
