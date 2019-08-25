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
    $(this).siblings('.btn--projects').addClass('is-shown');
    $(this).addClass("de-active");
  });
});

$('html').on('click',function(e){
    if(!$(e.target).hasClass('btn--more')) {
        $('.btn--projects').removeClass('is-shown');
        $('.btn--more').removeClass('de-active');
    }

    if($('.fw-section').hasClass('is-shown')) {
        console.log(e.target)
        if($(e.target).hasClass('is-shown')) {
            $('.fw-section').removeClass('is-shown')
        }
    }
});

$('.main-menu').find('.main-menu__link').on('click',function(e){
    var $this = $(this);
    var title = $this.data('title');
    var btnTitle = $this.data('btn-title');
    var projectList = $this.data('projects').split(',');
    
    $.each(projectList,(i,e)=> {
        $('.fw-section-list > *').html('');
        $('.fw-section-list').append(`<li class="fw-section-list__item">${e}</li>`);
    });

    console.log(projectList);

    e.preventDefault();
    $('.fw-section').addClass('is-shown');
    $('[data-elem=title]').html(title);
    $('[data-elem=btn]').html(btnTitle);
});

$('.fw-section').find('.btn--more').each(function(){
    $(this).on('click',function(){
        $(this).addClass('d-none');
        $('.fw-section-list').addClass('is-shown');
    });
});