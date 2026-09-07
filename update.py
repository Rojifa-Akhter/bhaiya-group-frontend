import re

with open('concerns.html', 'r', encoding='utf-8') as f:
    content = f.read()

sections = ''
bg_color = 'bg-[#FAFAFA]'

titles = [
    'Bhaiya Housing',
    'Bhaiya Hotels & Resorts',
    'Bhaiya Food & Beverage',
    'Bhaiya Media',
    'Bhaiya Software'
]

for i in range(1, 6):
    is_even = i % 2 == 0
    img_order = 'md:order-2' if is_even else ''
    txt_order = 'md:order-1' if is_even else ''
    
    sections += f'''
        <!-- Section {i} -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center border-t border-gray-200 pt-16 md:pt-24 first:border-0 first:pt-0">
          <!-- Image -->
          <div class="w-full h-[300px] md:h-[400px] {img_order}">
            <img src="./assets/images/concern/{i}.jpg" alt="{titles[i-1]}" class="w-full h-full object-cover shadow-sm" />
          </div>
          <!-- Content -->
          <div class="flex flex-col justify-center {txt_order}">
            <div class="relative inline-block mb-2">
               <span class="text-[70px] md:text-[90px] leading-[0.8] font-bold text-transparent" style="-webkit-text-stroke: 1px #cbd5e1;">0{i}</span>
               <span class="block text-[#2563EB] text-sm font-bold tracking-widest uppercase -mt-4 relative z-10 {bg_color} inline-block pr-2 w-fit">DIVISION-{i}</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-extrabold text-[#111827] uppercase mb-4">{titles[i-1]}</h2>
            <p class="text-gray-500 text-sm md:text-base leading-relaxed mb-8">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through. It has survived not only five centuries, electronic typesetting, rema</p>
            <a href="#" class="group inline-flex items-center gap-4 border border-[#111827] bg-transparent text-[#111827] pl-6 pr-2 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition w-fit">
              <div class="relative h-5 overflow-hidden pointer-events-none">
                <span class="block leading-5 transition-transform duration-500 group-hover:-translate-y-full">See Details</span>
                <span class="absolute top-0 left-0 block leading-5 translate-y-full transition-transform duration-500 group-hover:translate-y-0">See Details</span>
              </div>
              <div class="relative w-8 h-8 rounded-full border border-[#111827] flex items-center justify-center overflow-hidden ml-1">
                <img src="./assets/images/home/right-arrow.png" alt="arrow" class="absolute w-3 h-3 brightness-0 transition-all duration-500 transform group-hover:-translate-x-6 group-hover:opacity-0" />
                <img src="./assets/images/home/right-arrow.png" alt="arrow" class="absolute w-3 h-3 brightness-0 transition-all duration-500 transform translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </a>
          </div>
        </div>
'''

list_section = f'''
    <!-- Concerns List Section -->
    <section class="py-16 md:py-24 {bg_color} font-manrope">
      <div class="container mx-auto px-4 md:px-10 space-y-16 md:space-y-24">
{sections}
      </div>
    </section>
'''

# Insert before </main>
if '</main>' in content:
    content = content.replace('</main>', list_section + '\n    </main>')
    with open('concerns.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Successfully inserted concerns list section.')
else:
    print('Error: Could not find </main> tag.')
