let body = $("body");

$(function () {
  "use strict";

  gnbMenu($("#gnb"), $(".content"));
  tgMenu($(".toggle"));
  modalPopup($(".modal"), $(".modal_btn")); //popup, btn
  todayModalPopup($(".todayPopup"));
  //tabBasic($(".automatic.basic"));

  setTimeout(function () {
    $(".imgBox").addClass("on");
  }, 1000);

  $(".dark-mode input").click(function () {
    $("html").toggleClass("darkMode");
  });
});

//상단메뉴
const gnbMenu = (target, nextTarget) => {
  target.children().on({
    mouseover: function () {
      $(this).find("ul").slideDown();
      $(this).siblings().find("ul").slideUp();
    },
    focusin: function () {
      $(this).find("ul").slideDown();
      $(this).siblings().find("ul").slideUp();
    },
    mouseleave: function () {
      target.find("ul").slideUp();
    },
  });

  let other = [
    target.parent().prev(),
    !nextTarget ? target.parent().next() : nextTarget,
  ];
  other.forEach(function (el, i) {
    other[i].on("focusin", function () {
      target.find("ul").slideUp();
    });
  });
};

//토글메뉴
const tgMenu = (target) => {
  target.on("click ", function () {
    if ($(this).hasClass("on")) {
      $(target).each(function (i) {
        $(this).children("a, button").attr({
          title: "하위메뉴 열기",
          "aria-expanded": "false",
        });
        $(this).children("ul").attr({
          "aria-hidden": "true",
        });
      });
      $(this).removeClass("on").find("ul, div").slideUp();
    } else {
      $(this).children("a, button").attr({
        title: "하위메뉴 닫기",
        "aria-expanded": "true",
      });
      $(this).children("ul").attr({
        "aria-hidden": "false",
      });
      $(this).addClass("on").children("ul, div").slideDown();
      //다른토글메뉴 비활성화처리
      $(this).siblings().removeClass("on").find("ul, div").slideUp();
      $(this).siblings().children("a, button").attr({
        title: "하위메뉴 열기",
        "aria-expanded": "false",
      });
      $(this).siblings().children("ul").attr({
        "aria-hidden": "true",
      });
    }
  });

  target.find("li:last-child a").on("focusin", function () {
    $(this).keydown(function (e) {
      if (e.keyCode == "9") {
        //tab키
        target.removeClass("on").find("ul, div").slideUp();
      }
    });
    $(target).each(function (i) {
      $(this).children("a, button").attr({
        title: "하위메뉴 열기",
        "aria-expanded": "false",
      });
      $(this).children("ul").attr({
        "aria-hidden": "true",
      });
    });
  });
  target.children("a, button").on("focusin", function () {
    $(this).keydown(function (e) {
      if (e.keyCode == "9" && e.shiftKey) {
        target.removeClass("on").find("ul, div").slideUp();
      }
    });
    $(target).each(function (i) {
      $(this).children("a, button").attr({
        title: "하위메뉴 열기",
        "aria-expanded": "false",
      });
      $(this).children("ul").attr({
        "aria-hidden": "true",
      });
    });
  });
};

//팝업
const modalPopup = (target, btn) => {
  //초기화
  target.hide();

  //버튼클릭시
  btn.click(function () {
    let id = $(this).attr("data-popup");
    cont_box = $(".modal-content");
    content = target.find(".modal-body");
    target.delay(200).fadeIn().addClass("on").attr({
      tabindex: "0",
      "aria-hidden": "false",
      id: id,
    });

    body.addClass("notScroll");
    setTimeout(function () {
      cont_box.focus();
    }, 200);
    if (id.match("img_modal")) {
      let dataimg = $(this).attr("data-href");
      content.html(
        `<img src="${dataimg}" style="width:100%" alt="팝업이미지">`
      );
    } else if (id == "text_modal") {
      let datatxt = $(this).attr("data-text");
      content.html(`<p>${datatxt}</p>`);
    } else {
      content.html($(`.popupCont[data-name='${id}']`).html());
    }
  });

  //팝업닫기
  target.find(".close, .dimm").click(function () {
    let id = target.attr("id");
    btn_target = btn.filter(function () {
      return $(this).data("popup") === id;
    });
    btn_target.focus();
    target.delay(200).fadeOut().removeClass("on").attr({
      tabindex: "-1",
      "aria-hidden": "true",
      id: "",
    });
    body.removeClass("notScroll");
  });
};

//오늘팝업 제어
const todayModalPopup = (target) => {
  let chk = $("input.today_chk");
  target
    .find(".close")
    .click(function () {
      if (chk.is(":checked")) {
        chk.prop("checked", true);
        setCookie();
        //alert("체크됨");
      } else {
        chk.prop("checked", false);
        // alert("체크안됨");
      }

      target.hide().focusout().attr({
        "aria-hidden": "true",
        tabindex: "-1",
      });
      body.removeClass("notScroll");
    })
    .focus();

  //쿠키 확인하여 팝업을 보여줄지 결정
  if (document.cookie.indexOf("hidePopup=true") >= 0) {
    target.hide().attr({
      "aria-hidden": "false",
      tabindex: "0",
    }); // 팝업 숨기기
    // alert("쿠키저장");
    body.addClass("notScroll");
  } else {
    target.show().find(".close").focus(); // 쿠키가 없으면 팝업을 보여줌
    target.hide().focusout().attr({
      "aria-hidden": "true",
      tabindex: "-1",
    });
    body.removeClass("notScroll");
    // alert("쿠키닫기");
  }
};

// 쿠키 세팅 (만료일자를 당일 23시59분59초로 설정)
function setCookie() {
  const day = new Date();
  day.setHours(23, 59, 59, 999);

  const expires = `expires=${day.toUTCString()}`;
  document.cookie = `hidePopup=true; ${expires}; path=/; priority=high`;
}

/*
 
*/
//탭메뉴
// const tabBasic = (target) => {
//   target.find("button").click(function () {
//     let idx = $(this).index() + 1;
//     $(this).siblings().attr("aria-selected", "false");
//     $(this).attr("aria-selected", "true");
//     target.siblings().addClass("is-hidden");
//     target.siblings("#tabpanel-" + idx).removeClass("is-hidden");
//   });
// };
//tabMenu(document.querySelectorAll('#myTab li a'), document.querySelectorAll('#myTabCont div'));
// let tabMenu = (tabBtns, tabPanes) => {
//   tabBtns.forEach((tabBtn, idx) => {
//     tabBtn.addEventListener("click", () => {
//       tabBtns.forEach((other) => other.classList.remove("active"));
//       tabPanes.forEach((other) => other.classList.remove("active"));
//       tabBtn.classList.add("active");
//       tabPanes[idx].classList.add("active");
//     });
//   });
// };

//좌우포커스 탭메뉴

includehtml();
function includehtml() {
  let allElements = $(".include-html");
  Array.prototype.forEach.call(allElements, function (el) {
    let includePath = el.dataset.includePath;
    //console.log(includePath);
    if (includePath) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          el.outerHTML = this.responseText;
        }
      };
      xhttp.open("GET", includePath, false);
      xhttp.send();
    }
  });
}
