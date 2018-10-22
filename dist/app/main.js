jQuery(
    function(){
        var productGalleries = document.querySelectorAll('.product-gallery');
        console.log(productGalleries);
        jQuery.each(productGalleries, function(i, gallery) {
            var jGallery = jQuery(gallery);
            jGallery.find('.product-gallery__slides').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: jGallery.find('.product-gallery__left-arrow'),
                nextArrow: jGallery.find('.product-gallery__right-arrow')
            });
        });
    }
);