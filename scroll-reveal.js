document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('.article .image-container');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  images.forEach(img => observer.observe(img));

  //title
    const titleText = document.querySelector(".title-text");

  observer.observe(titleText);
});


