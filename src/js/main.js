var ConstructionList = [
  "5* Antedon De Luxe",
  "5*Ma Biche",
  "4* Park Claros",
  "3* Surtel",
  "Special Residence",
  "Special Residence 2",
  "Ata Houseing Complex",
  "The Supreme Court Quarters",
  "Waterside Houses",
  "K.K.K. Quarters",
  "Tusaş Motor Industry Social Facilitites",
  "Ray Kent",
  "4* Claros",
  "5* Alinda Beach",
  "5* Alatau"
];

$('[data-trigger]').each(function(){
  var $menuProjects = $('.menu--projects');

  $(this).on('click',function(e){
    e.preventDefault();
    var $this = $(this);
    var title  = $this.data('title') + "List";
    var thisList = window[title];

    $menuProjects.find('.menu > *').remove();

    $.each(thisList,function(idx,elem){
      $menuProjects.find('.menu').append(`<li class="menu__item"><a href="">${elem}</a></li>`)
    });

    $menuProjects.addClass('show');
    $menuProjects.find('.close-btn').on('click',function(){
      $menuProjects.removeClass('show');
    });
  });
});

$(".hamburger").on("click", function() {
  $("html,body").toggleClass("overflow-hidden");
  $(this)
    .closest(".header")
    .toggleClass("is-shown");
});

const $htmlBody = $("html,body");
var ww = $(window).width();

$(".btn--more").each(function() {
  var $this = $(this);
  ww = $(window).width();

  $this.on("click", function(e) {
    e.preventDefault();
    var $this = $(this);

    $this.closest(".main-section").addClass("animated");
    ww < 768 ? $htmlBody.addClass("overflow-hidden") : "";
  });

  $("html").on("click", function(e) {
    var $thisTarget = $(e.target);
    var isBtnMore = $thisTarget.hasClass("btn--more");
    var $mainSection = $(".main-section");

    if (!isBtnMore) {
      $mainSection.removeClass("animated");
      ww < 768 ? $htmlBody.removeClass("overflow-hidden") : "";
    }
  });
});

$(".main-menu")
  .find(".main-menu__item")
  .each(function() {
    var $this = $(this);
    var $fwSection = $(".fw-section");

    $this.on("click", function(e) {
      var titleValue = $this.data("title");
      var btnValue = $this.data("btn-title");
      var projectList = $this.data("projects").split(",");

      $("[data-elem=title]").html(titleValue);
      $("[data-elem=btn]").html(btnValue);

      $(".fw-section-list > *").each(function() {
        $(this).remove();
      });

      $.each(projectList, function(idx, elem) {
        $(".fw-section-list").append(
          `<li class="fw-section-list__item"><a href="/project-details.html">${elem}</a></li>`
        );
      });

      ww = $(window).width();

      $fwSection.removeClass("is-shown");
      setTimeout(function() {
        $fwSection.addClass("is-shown");
      }, 200);
      ww < 768 ? $htmlBody.addClass("overflow-hidden") : "";
    });
  });

$(".fw-section").each(function() {
  var $this = $(this);
  var $btnMore = $this.find(".btn--more");

  $btnMore.each(function() {
    $(this).on("click", function(e) {
      ww = $(window).width();
      e.preventDefault();
      $this.addClass("animated");
      ww < 768 ? $htmlBody.addClass("overflow-hidden") : "";
      $(".fw-section-list").addClass("is-shown");
    });
  });

  $("html").on("click", function(e) {
    var $thisTarget = $(e.target);
    var isBtnMore = $thisTarget.hasClass("btn--more");

    console.log(isBtnMore);

    if ($thisTarget.hasClass("fw-section") && $this.hasClass("animated")) {
      if (!isBtnMore) {
        $this.removeClass("animated");
        $(".fw-section-list").removeClass("is-shown");
        ww < 768 ? $htmlBody.removeClass("overflow-hidden") : "";
      }
    } else if (
      $thisTarget.hasClass("fw-section") &&
      !$this.hasClass("animated")
    ) {
      $this.removeClass("is-shown");
    }
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
