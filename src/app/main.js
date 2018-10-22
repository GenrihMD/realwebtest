jQuery(
    function(){
        jQuery('.product-gallery__slides').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            prevArrow: jQuery(this).siblings('.product-gallery__left-arrow'),
            nextArrow: jQuery(this).siblings('.product-gallery__right-arrow')
        });
    }
);