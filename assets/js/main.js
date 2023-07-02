
$(document).ready(function () {

  "use strict";


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return $(el);
    } else {
      return $(el).first();
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.each((index, element) => {
          $(element).on(type, listener);
        });
      } else {
        selectEl.on(type, listener);
      }
    }
  };


  /**
   * Loading animation
   */
  $(window).on('load', function () {
    $('#js-preloader').addClass('loaded');
  });


  /**
   * Navigate to section with offset on top
   */
  $('nav a, .section-title a').on('click', function (event) {
    event.preventDefault();

    var target = $(this).attr('href');
    if ($(target).length) {
      var offset = $(target).offset().top - 80;

      $('html, body').animate({
        scrollTop: offset
      }, 'swing');
    }
  });


  /**
   * Current section detector for nav
   */

  $(document).ready(function () {
    var navLinks = $('#navbar a');
    var sections = $('section, header');

    function makeNavLinkActive() {
      var scrollPosition = $(window).scrollTop();

      sections.each(function () {
        var sectionTop = $(this).offset().top;
        var sectionHeight = $(this).outerHeight();

        if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionTop + sectionHeight - 50) {
          var targetId = $(this).attr('id');

          navLinks.removeClass('active');
          navLinks.filter('[href="#' + targetId + '"]').addClass('active');
        }
      });
    }

    $(window).scroll(makeNavLinkActive);
  });


  /**
   * Sticky nav
   */

  let timeout;
  window.addEventListener('scroll', function () {
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      let navbar = document.getElementById("navbar");
      let sticky = navbar.offsetTop;

      if (document.documentElement.scrollTop - 80 >= sticky) {
        navbar.classList.add("stickyNav");
      } else {
        navbar.classList.remove("stickyNav");
      }
    }, 150);
  });


  /**
   * Porfolio isotope and filter
   */

  $(window).on('load', function () {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer.length) {
      let portfolioIsotope = new Isotope(portfolioContainer[0], {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.arrange({
          filter: $(this).attr('data-filter')
        });
      }, true);
    }
  });


  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

})()