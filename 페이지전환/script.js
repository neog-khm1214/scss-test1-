let pannel = document.querySelector(".pannel");
let content = document.querySelector(".main");
let nextBtn = document.getElementById("nextPage");
let count = "";
setTimeout(() => {
  content.classList.add("fade-in");
  pannel.classList.add("fade-in");
}, 500);
setTimeout(() => {
  pannel.classList.remove("fade-in");
  pannel.classList.add("reset");
}, 1500);

nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  content.classList.add("fade-out");
  pannel.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = this.href;
  }, 1500); // CSS transition 시간과 맞추기
});
