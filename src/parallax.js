export function parallax() {
    
    let lastScrollTop = 0;
    const parallaxContainer = $('.parallax-container');
    const header = $('header');
    const headerHeight = header.height();

    $(window).scroll(function () {
        let st = $(this).scrollTop();
        let scrollPercentage = Math.min(st / headerHeight, 1);

        parallaxContainer.css('transform', `translateY(${scrollPercentage * 50}px)`);
        let scale = 1 + (scrollPercentage * 0.4);
        parallaxContainer.css('transform', `scale(${scale}) translateY(${scrollPercentage * 50}px)`);

        lastScrollTop = st;
    });
}