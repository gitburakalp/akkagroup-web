var urlPathName = window.location.pathname;
var lang = localStorage.getItem("lang");
var ConstructionList = [];
var ConstructionUrl =
  lang == null
    ? "/contents/construction-projects-tr.json"
    : "/contents/construction-projects-en.json";

var TravelUrl =
  lang == null ? "/contents/travel-tr.json" : "/contents/travel-en.json";

var switchLang = "";

var TravelList = [
  "AKKA HOTELS Antedon",
  "AKKA HOTELS Alinda",
  "AKKA HOTELS Claros",
  "AKKA HOTELS Residence"
];

$(".main-slider").each(function() {
  const mainSliderItems = [
    "Akka<br><small>Tourism</small>",
    "Akka<br><small>Construction</small>",
    "Akka<br><small>Shopping Center</small>"
  ];

  var mainSlider = new Swiper(".main-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    touchRatio: 0,
    effect: "fade",
    loop: true,
    containerModifierClass: "main-slider--",
    wrapperClass: "main-slider-wrapper",
    slideClass: "main-slider-slide",
    slideActiveClass: "main-slider-slide--active",
    slideNextClass: "main-slider-slide--next",
    slidePrevClass: "main-slider-slide--prev",
    pagination: {
      el: ".main-slider-pagination",
      clickable: true,
      renderBullet: function(index, className) {
        return `<span class=${className}>${mainSliderItems[index]}</span>`;
      }
    },
    breakpoints: {
      1280: {
        touchRatio: 1
      }
    }
  });

  $(".circle-btn").on("click", function() {
    $(this)
      .closest(".main-slider")
      .toggleClass("is-active");
  });

  var ww = $(window).width();
  var $mainSliderPagination = $(".main-slider .main-slider-pagination");

  if (ww < 1280) {
    window.addEventListener("scroll", function() {
      $mainSliderPagination.addClass("bt-0");

      $(window).scrollTop() == 0
        ? $mainSliderPagination.removeClass("bt-0")
        : "";
    });
  }

  $("html,body").on("click", function(e) {
    !$(e.target).hasClass("project-btn") &&
    !$(e.target).hasClass("circle-btn") &&
    $(e.target)
      .closest(".main-slider")
      .hasClass("is-active")
      ? $(".main-slider").removeClass("is-active")
      : "";
  });
});

$(
  '<li class="header-menu__item"><a class="header-menu__link" lang-btn></a></li>'
).insertAfter(".header .header-menu__item:last-child");

$("[lang-btn]").each(function() {
  switch (lang) {
    case null:
      lang = "EN";
      $(this).text("EN");
      switchLang = "EN";
      break;
    case "EN":
      $(this).text("TR");
      switchLang = "TR";
      break;
    default:
      $(this).text("EN");
      switchLang = "EN";
      break;
  }

  document.title = "AKKA GROUP | " + lang;

  $(this).on("click", function() {
    localStorage.setItem("lang", switchLang);
    window.location.href = window.location.href;
  });
});

$.ajax({
  type: "get",
  url: ConstructionUrl,
  contentType: "application/json",
  dataType: "json",
  async: false,
  success: function(response) {
    $.each(response, function(i, e) {
      ConstructionList.push(e.Title);
    });
  },
  failure: function(response) {
    console.log(response);
  }
});

$(".header").each(function() {
  var $this = $(this),
    css = "scrolled",
    ww = $(window).width();

  if ($this && $this.length !== "" && ww >= 768) {
    let winTop = $(window).scrollTop(),
      elemTop = $("main section:nth-child(1)").offset().top,
      elemHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      ),
      elemBottom = elemTop + elemHeight / 1.5;

    if (elemTop > elemBottom) {
      $this.addClass(css);
    } else {
      $this.removeClass(css);
    }

    $(window).scroll(function() {
      winTop = $(window).scrollTop();

      if (winTop >= elemBottom - 400 && winTop < elemBottom) {
        $this.addClass("tr");
      } else {
        $this.removeClass("tr");
      }

      if (winTop >= elemBottom) {
        $this.addClass(css);
      } else {
        $this.removeClass(css);
      }
    });
  }
});

$(".projects-submenu").each(function() {
  var $this = $(this);

  $.ajax({
    type: "get",
    url: ConstructionUrl,
    contentType: "application/json",
    dataType: "json",
    async: false,
    success: function(response) {
      $.each(response, function(i, e) {
        $this.append(
          `<li class="projects-submenu__item"><a href="${e.Url}" class="projects-submenu__link" >${e.Title}</a></li>`
        );
      });
    },
    failure: function(response) {
      console.log(response);
    }
  });
});

$("[data-trigger]:not(.circle-btn)").each(function() {
  var $menuProjects = $(".menu--projects");

  $(this).on("click", function(e) {
    e.preventDefault();
    var $this = $(this);

    console.log($this.data("title"));

    var thisUrl = window[$this.data("title") + "Url"];

    console.log(thisUrl);

    $(".menu-title").html($(this).data("title"));
    $menuProjects.find(".menu > *").remove();

    $.ajax({
      type: "get",
      url: thisUrl,
      contentType: "application/json",
      dataType: "json",
      async: false,
      success: function(response) {
        $.each(response, function(i, e) {
          $menuProjects
            .find(".menu")
            .append(
              `<li class="menu__item"><a href="${e.Url}">${e.Title}</a></li>`
            );
        });
      },
      failure: function(response) {
        console.log(response);
      }
    });

    $menuProjects.addClass("show");
    $menuProjects.find(".close-btn").on("click", function() {
      $menuProjects.removeClass("show");
    });
  });
});

$('.circle-btn[data-trigger]').each(function(){
  var $constrMenu = $('.construction-menu');

  $(this).on('click',function(){
    $constrMenu.find("*").remove();

    $.ajax({
    type: "get",
    url: ConstructionUrl,
    contentType: "application/json",
    dataType: "json",
    async: false,
    success: function(response) {
      $.each(response, function(i, e) {
        $constrMenu.append(
          `<li class="construction-menu-item"><a href="${e.Url}" class="construction-menu-link" >${e.Title}</a></li>`
        );
      });
    },
    failure: function(response) {
      console.log(response);
    }
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
    ww < 1280 ? $htmlBody.addClass("overflow-hidden") : "";
  });

  $("html").on("click", function(e) {
    var $thisTarget = $(e.target);
    var isBtnMore = $thisTarget.hasClass("btn--more");
    var $mainSection = $(".main-section");

    if (!isBtnMore) {
      $mainSection.removeClass("animated");
      ww < 1280 ? $htmlBody.removeClass("overflow-hidden") : "";
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

      $("[data-elem=title]").html(titleValue);
      $("[data-elem=btn]").html(btnValue);

      $(".fw-section-list > *").each(function() {
        $(this).remove();
      });

      $.ajax({
        type: "get",
        url: ConstructionUrl,
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function(response) {
          $.each(response, function(i, e) {
            $(".fw-section-list").append(
              `<li class="fw-section-list__item"><a href="${e.Url}" class="projects-submenu__link" target="_blank">${e.Title}</a></li>`
            );
          });
        },
        failure: function(response) {
          console.log(response);
        }
      });

      ww = $(window).width();

      $fwSection.removeClass("is-shown");
      setTimeout(function() {
        $fwSection.addClass("is-shown");
        $("html,body").animate({
          scrollTop: 0
        });
        $htmlBody.addClass("overflow-hidden");
      }, 200);
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
      ww < 1280 ? $htmlBody.addClass("overflow-hidden") : "";
      $(".fw-section-list").addClass("is-shown");
    });
  });

  $("html").on("click", function(e) {
    var $thisTarget = $(e.target);
    var isBtnMore = $thisTarget.hasClass("btn--more");

    if ($thisTarget.hasClass("fw-section") && $this.hasClass("animated")) {
      if (!isBtnMore) {
        $this.removeClass("animated");
        $(".fw-section-list").removeClass("is-shown");
        $htmlBody.removeClass("overflow-hidden");
      }
    } else if (
      $thisTarget.hasClass("fw-section") &&
      !$this.hasClass("animated")
    ) {
      $this.removeClass("is-shown");
      $htmlBody.removeClass("overflow-hidden");
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

$(".projects-submenu .projects-submenu__item").each(function() {
  var $this = $(this);

  $this.hover(function() {
    var $projectSection = $this.closest(".projects-section");

    var title = $this.find(".projects-submenu__link").text();
    var logoSource = $this.data("project-logo");
    var projectImage = $this.data("project-image");
    var projectUrl = $this.data("project-url");

    $(".projects-details-section").fadeOut();

    setTimeout(function() {
      $projectSection.find(".project-title").text(title);
      $projectSection.find("[data-elem=project-logo]").attr("src", logoSource);
      $projectSection
        .find('[data-elem="project-details-image"]')
        .attr("src", projectImage);
      $projectSection
        .find('[data-elem="project-url"]')
        .attr("href", projectUrl);
      $(".projects-details-section").fadeIn();
    }, 500);
  });
});

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 100
          },
          1000,
          function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            //$target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
              //$target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });

//PROJECT DETAILS ->

if (lang != undefined) {
  var currentIdx = 0;
  $.ajax({
    type: "get",
    url: ConstructionUrl,
    contentType: "application/json",
    dataType: "json",
    async: false,
    success: function(response) {
      $.each(response, function(i, e) {
        if (e.Url == urlPathName) {
          $("[project-title]").html(e.Title);
          $("[project-description]").html(e.Description);
          $("[project-description-2]").html(e.Description2);
          currentIdx = Object.keys(response).indexOf(i);
        }

        if (Object.keys(response).indexOf(i) == currentIdx + 1) {
          $("[next-project]").attr("href", e.Url);
        }
      });
    },
    failure: function(response) {
      console.log(response);
    }
  });

  $(".fw-section-list").each(function() {
    var $this = $(this);

    $.each(ConstructionList, (i, e) => {
      $this.append(`<li class="fw-section-list__item">${e}</li>`);
    });
  });
}
