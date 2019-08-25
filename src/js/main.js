$(".hamburger").on("click", function() {
    $('html,body').toggleClass('overflow-hidden');
    $(this).closest('.header').toggleClass('is-shown');
});
