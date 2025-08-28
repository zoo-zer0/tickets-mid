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
    } else if (step === "13"||step === "14") {
      top.classList.add("active");
    } else if (step==="15"||step === "16") {
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
  // ---- step 8에서 두 번째 이미지 reveal ----
  const secondImg = document.querySelector(
    ".scrolly__graphic .graphic .stats-figure:nth-of-type(2) img"
  );

  const step8Observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepNumber = entry.target.getAttribute("data-step");
          if (stepNumber === "8") {
            secondImg.classList.add("visible"); // 한번 나타나면 그대로 유지
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  // step 8만 관찰
  const step8 = document.querySelector('.step[data-step="8"]');
  if (step8) step8Observer.observe(step8);
  
});
