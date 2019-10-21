const Header =
  '<nav class="header-nav"> <a href="/new" class="header-logo"> <img data-src="/images/svg/akka-logo.svg" alt="" title="" /> </a><div class="hamburger d-md-none"><div></div><div></div><div></div></div><ul class="header-menu"></ul> </nav>';

const Footer =
  '<div class="footer-container"><div class="row"><div class="col-12"><h2 class="footer-title">CONTACT</h2></div></div><div class="row align-items-center text-center text-xl-left"><div class="col-12 col-xl-auto"><h4 class="footer-subtitle"> AKKA Head Office</h4><p class="footer-description"> Tunalı Hilmi Cad. 114/ 36<br /> 06700 Ankara<br /><br /> T. +90 312 467 44 91<br /> F. +90 312 467 14 15</p></div><div class="col-12 col-xl-auto"><h4 class="footer-subtitle"> AKKA Head Office</h4><p class="footer-description"> Şilli Meydanı Güneş Sok. 4 / 4<br /> Ankara<br /><br />T. +90 312 467 14 14<br /> F. +90 321 467 30 60</p></div><div class="col-12 col-xl-auto"><h4 class="footer-subtitle"> AKKA İstanbul Office</h4><p class="footer-description"> FSM caddesi Özgür Sok. Hilal Plaza No :22 <br />Kat :3 Kavacık Beykoz İstanbul<br /><br />T. +90 216 425 09 15 <br /> F. +90 216 425 09 85</p></div><div class="col-12 col-xl-auto"><h4 class="footer-subtitle"> AKKA Head Office</h4><p class="footer-description"> AKKA Hotels Antedon De Luxe<br /> Beldibi İlköğretim Okulu Yanı Beldibi 1 <br /> 07985 Kemer Antalya<br /><br />T. +90 242 824 99 99<br /> F. +90 242 824 98 91</p></div><div class="order--1 input-section ml-xl-auto col-12 col-xl-auto p-0"> <input type="text" class="form-control--transparent" placeholder="Name" /> <input type="text" class="form-control--transparent" placeholder="Surname" /> <input type="text" class="form-control--transparent" placeholder="E-Mail" /><textarea rows="3" class="form-control--transparent" placeholder="Message" ></textarea><div class="col-12 text-center"> <a href="#" class="btn btn-primary">SEND</a></div></div></div><ul class="footer-menu mt-5"></ul><div class="d-flex flex-wrap align-items-center justify-content-center akka-group-section" ><div class="col-12 text-center col-xl-auto"> <img class="img-fluid" data-src="/images/svg/footer-logo.svg" alt="" /></div><div class="col-12 col-xl-auto"><p class="footer-copyright"> All rights reserved. 2019 © AKKA Group</p></div></div></div>';

const ProjectDetailsPage =
  '<section class="pd-section"><div class="pd-section__headings"><h3 class="project-details__title" project-details-title></h3><h4 class="project-details__subtitle" project-type> Project Type</h4><ul class="breadcrumb"><li class="breadcrumb-item"> <a href="/" class="breadcrumb-link" home-title></a></li><li class="breadcrumb-item" project-type></li></ul></div><div class="row no-gutters pd-section__details align-items-center justify-content-md-center" ><div class="order-2 order-xl-1 col-auto"><div class="row mx-0 mt-5 mt-lg-0 align-items-center justify-content-between" ><div class="col-auto pr-0 pd-section__logo"> <img class="img-fluid" data-src="/images/svg/akka-suites-logo.svg" /></div><div class="col-auto"><h2 class="project-title text-right mb-md-105" project-title ></h2></div></div><div class="row mx-0 mt-5"><div class="col-12"><p class="description text-left" project-description></p><p class="description text-left" project-description-2></p></div></div><div class="row mx-0"><div class="col-12"><ul class="fw-section-list is-shown is-black"><li class="fw-section-list__item"></li></ul></div></div></div><div class="order-1 order-xl-2 col-auto"><div class="slider-container" data-elem="swiper"><div class="slider-wrapper"></div><div class="slider-pagination"></div></div><div class="row mx-auto"><div class="col-12 text-right"> <a class="btn" next-project><b>Next</b> Project</a></div></div></div></div> </section> <a href="" class="btn--back"></a>';

var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("type", "image/png");
link.setAttribute("href", "/favicon.png");
document.head.appendChild(link);

$("#projectDetailsPage").each(function() {
  $(this).append(ProjectDetailsPage);
});

let urlPathName = window.location.pathname;

let lang =
  (localStorage.getItem("lang") === null)  ? "tr" : localStorage.getItem("lang");
let switchLang = lang === "tr" ? "en" : "tr";

let ConstructionList = [];

var ConstructionUrl = `/contents/construction-projects-${lang}.json`;
var TravelUrl = `/contents/travel-${lang}.json`;
var RetailUrl = `/contents/retail-projects-${lang}.json`;


let siteJSON = null;

$(".header").append(Header);
$(".footer").append(Footer);

var headerNameList = {
  tr: [
    { path: "#aboutUs", name: "HAKKIMIZDA" },
    { path: "#qualityAssurance", name: "KALİTE ANLAYIŞI" },
    { path: "#projects", name: "PROJELERİMİZ" },
    { path: "#contact", name: "İLETİŞİM" }
  ],
  en: [
    { path: "#aboutUs", name: "ABOUT US" },
    { path: "#qualityAssurance", name: "QUALITY ASSURANCE" },
    { path: "#projects", name: "PROJECTS" },
    { path: "#contact", name: "CONTACT" }
  ]
};

let TravelList = [
  "AKKA HOTELS Antedon",
  "AKKA HOTELS Alinda",
  "AKKA HOTELS Claros",
  "AKKA HOTELS Residence"
];

//#region Load Site Content

$(function() {
  $.ajax({
    type: "get",
    url: "/contents/site.json",
    contentType: "application/json",
    dataType: "json",
    async: false,
    success: function(response) {
      $.each(response, function(jsonLang, e) {
        if (jsonLang == lang) {
          $.each(e, function(type, elem) {
            siteJSON = e;

            switch (type) {
              case "about":
                $("[about-title]").html(elem.title);
                $("[about-subtitle]").html(elem.subtitle);
                $("[about-content]").html(elem.content);
                break;
              case "qualityAssurance":
                $("[qualityAssurance-title]").html(elem.title);
                $("[qualityAssurance-content]").html(elem.content);
                break;
              default:
                $("[project-details-title]").html(siteJSON.projectTitle);
                $("[project-subtitle]").html("Project Type");
                $("[home-title]").html(siteJSON.homeTitle);

                break;
            }
          });
        }
      });
    },
    failure: function(response) {
      console.log(response);
    }
  });
});

window.addEventListener("DOMContentLoaded", function() {
  $("[data-src]").each((idx, e) => {
    var $this = $(e);
    var imgSource = $this.data("src");
    $this.attr("src", imgSource);
  });

  $("[data-bg-src]").each(function() {
    var imgSource = $(this).data("bg-src");
    $(this).attr("style", `background-image:url(${imgSource})`);
  });
});

//#endregion

//#region Header Functions
$.each(headerNameList, function(i, e) {
  var currentLang = lang != "" ? lang.toLowerCase() : "tr";
  if (i == currentLang) {
    $.each(e, (i, j) => {
      $(".header-menu").append(
        `<li class="header-menu__item"><a href="${j.path}" class="header-menu__link">${j.name}</a></li>`
      );

      $(".footer-menu").append(
        `<li class="footer-menu__item"><a href="${j.path}" class="footer-menu__link">${j.name}</a></li>`
      );
    });
  }
});

$(
  `<li class="header-menu__item"><a class="header-menu__link" lang-btn></a></li>`
).insertAfter(".header .header-menu__item:last-child");

$("[lang-btn]").each(function() {
  switch (lang) {
    case "tr":
      $(this).text(switchLang);
      break;
    case "en":
      $(this).text(switchLang);
      break;
  }

  document.title = "AKKA GROUP | " + lang.toUpperCase();

  $(this).on("click", function() {
    localStorage.setItem("lang", switchLang);
    window.location.href = window.location.href;
  });
});
//#endregion

$(".main-slider").each(function() {
  const mainSliderItems = [
    `Akka<br><small>${lang == "tr" ? "Turizm" : "Tourism"}</small>`,
    `Akka<br><small>${lang == "tr" ? "İnşaat" : "Construction"}</small>`,
    `Akka<br><small>${lang == "tr" ? "Perakende" : "Retail"}</small>`
  ];

  // $(this)
  //   .find(".main-slider-slide")
  //   .each(function(i) {
  //     $(this)
  //       .find(".main-slider-title")
  //       .html("title" + i);
  //   });

  var mainSlider = new Swiper(".main-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    touchRatio: 0,
    effect: "fade",
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

  $(".main-slider-pagination > *").each(function() {
    $(".main-slider-pagination > *:nth-child(1)").addClass("active");

    $(this).on("click", function() {
      $(".main-slider-pagination > *").removeClass("active");
      $(this).addClass("active");
    });
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

  $this.find(".header-menu__item").each(function() {
    $(this).on("click", function() {
      $this.find(".header-menu__item").removeClass("active");
      $(this).addClass("active");
    });
  });

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
  var $projectsSubMenu = $('.projects-submenu');

  var ww = $(window).width();

  $(this).on("click", function(e) {
    e.preventDefault();
    var $this = $(this);
    var thisUrl = window[$this.data("title") + "Url"];

    $(".menu-title").html($(this).data("title"));

    if (ww > 768) {
      $('.projects-submenu > *').remove();
    }
    else {
      $menuProjects.find(".menu > *").remove();
    }

    $.ajax({
      type: "get",
      url: thisUrl,
      contentType: "application/json",
      dataType: "json",
      async: false,
      success: function(response) {
        $.each(response, function(i, e) {

          if(ww < 768) {
            $menuProjects
            .find(".menu")
            .append(
              `<li class="menu__item"><a href="${e.Url}">${e.Title}</a></li>`
            );
          }
          else {
            $projectsSubMenu.append(`<li class="projects-submenu__item"><a href="${e.Url}" class="projects-submenu__link">${e.Title}</a></li>`);
            console.log(e.Url)
          }
        });
      },
      failure: function(response) {
        console.log(response);
      }
    });

    if (ww < 768) {
      $menuProjects.addClass("show");
      $menuProjects.find(".close-btn").on("click", function() {
        $menuProjects.removeClass("show");
      });
    }
  });
});

$(".circle-btn[data-trigger]").each(function() {
  var $constrMenu = $(".construction-menu");

  $(this).on("click", function() {
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
  var thisUrl = "";

  $('#projectDetailsPage').each(function(){
    var projectType = window.location.pathname.split('/')[2] == "perakende" ? "Retail" : "Construction";
    thisUrl = window[projectType + "Url"];
  });


  $.ajax({
    type: "get",
    url: thisUrl,
    contentType: "application/json",
    dataType: "json",
    async: false,
    success: function(response) {
      $.each(response, function(i, e) {
        if (e.Url == urlPathName) {
          document.title = e.Title;

          $("[project-title]").html(e.Title);
          $("[project-description]").html(e.Description);
          $("[project-description-2]").html(e.Description2);

          if (e.images !== undefined) {
              if (e.images.includes(',')) {
            var array = e.images.split(',');

            array.forEach(function(e,i){
              $('.pd-section__details .slider-container .slider-wrapper').append(`<div class='slider-slide'><img src='${e}' alt='Project Image ${i + 1}' /></div>`)
            })
          }
          }

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

    $('.pd-section__details .slider-container').length != 0 ? $('.pd-section__details .slider-container')[0].swiper.update() : "";

  $(".fw-section-list").each(function() {
    var $this = $(this);

    if (window.location.pathname.split('/')[2] == "inşaat") {
      $.each(ConstructionList, (i, e) => {
        $this.append(`<li class="fw-section-list__item">${e}</li>`);
      });
    }
    else {
        $this.append(`<li class="fw-section-list__item">AKKAPARK</li>`);
    }

    
  });
}
