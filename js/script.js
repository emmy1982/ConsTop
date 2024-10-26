 // Hamburger menu functionality
 const hamburger = document.querySelector('.hamburger');
 const navLinks = document.querySelector('.nav-links');

 hamburger.addEventListener('click', () => {
   navLinks.classList.toggle('active');
 });

 // Carousel functionality
 const carouselItems = document.querySelectorAll('.carousel-item');
 let currentItem = 0;

 function showNextItem() {
   carouselItems[currentItem].classList.remove('active');
   currentItem = (currentItem + 1) % carouselItems.length;
   carouselItems[currentItem].classList.add('active');
 }

 setInterval(showNextItem, 5000);


//  Carousel functionality

let touchStartX = 0;
const carousel = document.querySelector('.carousel01');

carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

carousel01.addEventListener('touchmove', (e) => {
  if (!touchStartX) return;

  const touchEndX = e.touches[0].clientX;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > 50) {
    // Reset touch start to prevent multiple swipes
    touchStartX = 0;
    
    // Calculate current position and adjust animation
    const currentTransform = carousel01.style.transform || '0';
    const currentX = parseInt(currentTransform.replace(/[^\d-]/g, '')) || 0;
    
    if (diff > 0) {
      // Swipe left
      carousel01.style.transform = `translateX(${currentX - 20}%)`;
    } else {
      // Swipe right
      carousel01.style.transform = `translateX(${currentX + 20}%)`;
    }
  }
});

// Gallery item animation

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply initial styles and observe all gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
  item.style.opacity = 0;
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(item);
});

// Handle touch devices
if ('ontouchstart' in window) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('touchstart', function(e) {
      this.querySelector('.gallery-content').style.opacity = 1;
    });
    
    item.addEventListener('touchend', function(e) {
      setTimeout(() => {
        this.querySelector('.gallery-content').style.opacity = 0;
      }, 1000);
    });
  });
}