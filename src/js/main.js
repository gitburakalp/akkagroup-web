var urlPathName = window.location.pathname;
var lang = localStorage.getItem("lang");
var ConstructionList = [];
var ConstructionUrl =
  lang == "EN"
    ? "/contents/construction-projects-en.json"
    : "/contents/construction-projects-tr.json";
var switchLang = "";

$("body").fadeIn(1000);
document.title = "AKKA GROUP | " + lang;

$(
  '<li class="header-menu__item"><a class="header-menu__link" lang-btn></a></li>'
).insertAfter(".header .header-menu__item:last-child");

$("[lang-btn]").each(function() {
  switch (lang) {
    case undefined:
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

$("[data-trigger]").each(function() {
  var $menuProjects = $(".menu--projects");

  $(this).on("click", function(e) {
    e.preventDefault();
    var $this = $(this);

    $menuProjects.find(".menu > *").remove();

    $.ajax({
      type: "get",
      url: ConstructionUrl,
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
      ww < 768 ? $htmlBody.addClass("overflow-hidden") : "";
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

  $this.on("mouseleave", function() {
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

$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top - 125
    },
    1000
  );
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
