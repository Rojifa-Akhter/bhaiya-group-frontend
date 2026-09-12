const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Add group-hover:bg-[#419bd1]
content = content.replace(/<div class=\"biz-card biz-card-short group p-5 flex flex-col justify-end\">/g, '<div class="biz-card biz-card-short group p-5 flex flex-col justify-end group-hover:bg-[#419bd1]">');
content = content.replace(/<div class=\"biz-card biz-card-tall group p-5 flex flex-col justify-end\">/g, '<div class="biz-card biz-card-tall group p-5 flex flex-col justify-end group-hover:bg-[#419bd1]">');

// 2. Add Left Nav Button
const cssToInsert = '\n      #bizPrev.swiper-button-disabled, #bizNext.swiper-button-disabled {\n        display: none !important;\n      }\n';
if (!content.includes('bizPrev.swiper-button-disabled')) {
  content = content.replace('</style>', cssToInsert + '    </style>');
}

const prevBtnHtml = '\n            <!-- Left Nav Button -->\n            <button id="bizPrev"\n              class="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1864FF] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 transition-all z-50 pointer-events-auto"\n              style="top: calc(var(--cutout-h) / 2 - 24px); left: calc(var(--cutout-w) / 2 - 24px);">\n              <i class="fa-solid fa-arrow-left text-lg"></i>\n            </button>\n';
if (!content.includes('id="bizPrev"')) {
  content = content.replace('<!-- Right Nav Button', prevBtnHtml + '            <!-- Right Nav Button');
}

// 3. Update Swiper Config
const newSwiperConfig = `        const bizSwiper = new Swiper('.bizSwiper', {
          slidesPerView: 1.2,
          spaceBetween: 25,
          slidesPerGroup: 1,
          loop: false,
          navigation: {
            nextEl: '#bizNext',
            prevEl: '#bizPrev',
          },
          breakpoints: {
            640: { slidesPerView: 2.2, spaceBetween: 24, slidesPerGroup: 2 },
            1024: { slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4 }
          }
        });`;

const swiperRegex = /const bizSwiper = new Swiper\('\.bizSwiper'[\s\S]*?bizSwiper\.slideNext\(\);\s*}\);\s*\}\);/m;
if (swiperRegex.test(content)) {
    content = content.replace(swiperRegex, newSwiperConfig + '\n      });');
} else {
    console.log("Could not find swiper config to replace");
}

fs.writeFileSync('index.html', content);
console.log('Done!');
