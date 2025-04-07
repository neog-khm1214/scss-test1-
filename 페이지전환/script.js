let pannel = document.querySelector(".pannel");
let content = document.querySelector(".main");
let nextBtn = document.getElementById("nextPage");
let count = 290;
if (self.window.name.indexOf("justAwordToNowisYourWindow") != 0) {
  //처음 페이지 접근시
  self.window.name = "justAwordToNowisYourWindow";
  //alert("first Load");
  pannel.classList.add("reset");
  content.classList.add("fade-in");
} else {
  //새로고침이나 페이지 전환시
  //새로고침할때마
  //alert("reload");

  setTimeout(() => {
    content.classList.add("fade-in");
    pannel.classList.add("fade-in");
  }, count);
  setTimeout(() => {
    pannel.classList.remove("fade-in");
    pannel.classList.add("reset");
  }, count * 3);
}

nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  content.classList.add("fade-out");
  pannel.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = this.href;
  }, count * 2); // CSS transition 시간과 맞추기
});
