$(".hamburger").on("click", function() {
  $("html,body").toggleClass("overflow-hidden");
  $(this)
    .closest(".header")
    .toggleClass("is-shown");
});

$(".btn--more").each(function() {
  var $this = $(this);

  $this.on("click", function(e) {
    e.preventDefault();
    var $this = $(this);

    $this.closest(".main-section").addClass("animated");
  });

  $("html").on("click", function(e) {
    var $thisTarget = $(e.target);
    var isBtnMore = $thisTarget.hasClass("btn--more");
    var $mainSection = $(".main-section");

    if (!isBtnMore) {
      $mainSection.removeClass("animated");
    }
  });
});

$("html").on("click", function(e) {
  if (!$(e.target).hasClass("btn--more")) {
    $(".main-section").removeClass("animated");
    $(".btn--projects").removeClass("is-shown");
    $(".btn--more").removeClass("de-active");
  }

  if ($(".fw-section").hasClass("is-shown")) {
    console.log(e.target);
    if ($(e.target).hasClass("is-shown")) {
      $(".fw-section").removeClass("is-shown");
    }
  }
});

// $(".main-menu")
//   .find(".main-menu__link")
//   .on("click", function(e) {
//     var $this = $(this);
//     var title = $this.data("title");
//     var btnTitle = $this.data("btn-title");
//     var projectList = $this.data("projects").split(",");

//     $.each(projectList, (i, e) => {
//       $(".fw-section-list > *").html("");
//       $(".fw-section-list").append(
//         `<li class="fw-section-list__item">${e}</li>`
//       );
//     });

//     console.log(projectList);

//     e.preventDefault();
//     $("html,body").toggleClass("overflow-hidden");
//     $(".fw-section").addClass("is-shown");
//     $("[data-elem=title]").html(title);
//     $("[data-elem=btn]").html(btnTitle);
//   });

$(".fw-section")
  .find(".btn--more")
  .each(function() {
    $(this).on("click", function() {
      $(this).addClass("d-none");
      $(".fw-section-list").addClass("is-shown");
    });
  });

var sliders = [];
$('[data-elem="swiper"]').each(function(i, e) {
  var $this = $(e);
  var sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 30,
    containerModifierClass: "slider-container--",
    wrapperClass: "slider-wrapper",
    slideClass: "slider-slide",
    slideActiveClass: "slider-slide--active",
    slideNextClass: "slider-slide--next",
    slidePrevClass: "slider-slide--prev",
    pagination: {
      el: ".slider-pagination",
      clickable: true,
      bulletClass: "slider-pagination-bullet",
      bulletActiveClass: "slider-pagination-bullet--active",
      modifierClass: "slider-pagination-current",
      hiddenClass: "slider-pagination-hidden",
      clickableClass: "slider-pagination-clickable"
    },
    breakpoints: {
      767: {
        spaceBetween: 0
      }
    }
  };

  sliders[i] = new Swiper($this, sliderConfig);
});
