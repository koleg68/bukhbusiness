/* begin Back to Top button  */
(function () {
  "use strict";

  function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add("back_to_top-show");
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove("back_to_top-show");
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  let goTopBtn = document.querySelector(".back_to_top");

  window.addEventListener("scroll", trackScroll);
  goTopBtn.addEventListener("click", backToTop);
})();
/* end begin Back to Top button  */

// === BEGIN inputMaskPhone ====/

const inputs = document.querySelectorAll('input[type="tel"]');
const im = new Inputmask("+7(999) 999-99-99");
im.mask(inputs);

// === END inputMaskPhone ====/

function tarifPlan() {
  const tarifPlan = document.querySelectorAll("span.price-elem");

  for (let i of tarifPlan) {
    i.addEventListener("click", () => {
      let data = i.parentElement.firstElementChild.innerHTML;
      localStorage.setItem("tarif", data);
      scrollDown();
      setTimeout(popMessage, 1000);
      setTimeout(delWindow, 4000);
    });
    clearTimeout(popMessage);
  }
}
tarifPlan();

function scrollDown() {
  let height = 0,
    attempt = 0,
    intS = 0;

  function scrollToEndPage() {
    if (height < document.body.scrollHeight) {
      height = document.body.scrollHeight;
      window.scrollTo(0, height);
      attempt++;
    } else {
      clearInterval(intS);
    }
  }
  intS = setInterval(scrollToEndPage, 50);
}

function popMessage() {
  const div = document.createElement("div"),
    form = document.querySelector("form");

  div.classList.add("tariff-plan");
  div.innerHTML = `Вы выбрали тарифный план <br> ${localStorage.getItem(
    "tarif"
  )}`;
  form.appendChild(div);
}

function delWindow() {
  const div = document.querySelector("div.tariff-plan");
  div.classList.add("hide-tariff-plan");
  setTimeout(function () {
    div.parentNode.removeChild(div);
  }, 2000);
}


let form = document.getElementsByTagName('form')[0];
let data = document.getElementsByName('data')[0];
form.addEventListener('submit', (e) => {
e.preventDefault();
data = localStorage.getItem('tarif');
form.submit();
});
