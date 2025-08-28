document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step");
  const premiumAvg = document.querySelector(".premium_avg");
  const premium = document.querySelector(".premium");
  const top = document.querySelector(".concert_top10");
const intersect = document.querySelector(".concert_baseball_top5");
  const graphics = [premiumAvg, premium, top, intersect];

  function updateGraphic(step) {
    // 모두 비활성화
    graphics.forEach(g => g.classList.remove("active"));

    // step에 맞는 것만 활성화
    if (step === "10") {
      premiumAvg.classList.add("active");
    } else if (step === "11" || step === "12") {
      premium.classList.add("active");
    } else if (step === "13") {
      top.classList.add("active");
    } else if (step === "14"||step==="15") {
      intersect.classList.add("active");
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepNumber = entry.target.getAttribute("data-step");
          updateGraphic(stepNumber);
        }
      });
    },
    { threshold: 0.5 }
  );

  steps.forEach(step => observer.observe(step));

  // 초기 상태
  const activeStep = document.querySelector(".step.active");
  if (activeStep) {
    updateGraphic(activeStep.getAttribute("data-step"));
  }
});
