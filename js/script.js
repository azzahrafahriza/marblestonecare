(function($) {

    "use strict";

    $(document).ready(function() {

        $("#preloader").fadeOut("slow");

        $('.feat-swiper').hcSticky({
            stickTo: $('.feat-product-grid')
        });

        $(".user-items .search-item").click(function() {
            $(".search-box").toggleClass('active');
            $(".search-box .search-input").focus();
        });
        $(".close-button").click(function() {
            $(".search-box").toggleClass('active');
        });

        var swiper = new Swiper(".main-swiper", {
            speed: 500,
            loop: true,
            pagination: {
                el: "#billboard .swiper-pagination",
                clickable: true,
            },
        });

        $('.product-swiper').each(function() {
            var sectionId = $(this).attr('id');
            var swiper = new Swiper("#" + sectionId + " .swiper", {
                slidesPerView: 4,
                spaceBetween: 20,
                pagination: {
                    el: "#" + sectionId + " .swiper-pagination",
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    999: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1366: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                },
            });
        })


        var swiper = new Swiper(".testimonial-swiper", {
            loop: true,
            navigation: {
                nextEl: ".swiper-arrow-next",
                prevEl: ".swiper-arrow-prev",
            },
            pagination: {
                el: "#testimonials .swiper-pagination",
                clickable: true,
            },
        });

        var swiper = new Swiper(".collection-swiper", {
            slidesPerView: 4,
            spaceBetween: 10,
            loop: false,
            pagination: {
                el: "#collections .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                599: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                980: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });

        var brandSwiper = new Swiper(".brand-swiper", {
            slidesPerView: 2,
            spaceBetween: 30, // <-- ini jarak antar logo (slide)
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                576: { slidesPerView: 3, spaceBetween: 30 },
                768: { slidesPerView: 4, spaceBetween: 40 },
                992: { slidesPerView: 5, spaceBetween: 50 },
                1200: { slidesPerView: 6, spaceBetween: 60 }
            }
        });



        var swiper = new Swiper('.pricing-swiper', {
            slidesPerView: "auto", // biar ukuran bisa fleksibel
            spaceBetween: 30,
            loop: false,
            centeredSlides: true,
            initialSlide: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                576: {
                    slidesPerView: "auto",
                },
                768: {
                    slidesPerView: "auto",
                },
                992: {
                    slidesPerView: "auto",
                }
            }
        });



        // product single page
        var thumb_slider = new Swiper(".product-thumbnail-slider", {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: true,
            direction: "vertical",
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });

        var large_slider = new Swiper(".product-large-slider", {
            slidesPerView: 1,
            autoplay: true,
            spaceBetween: 0,
            effect: 'fade',
            thumbs: {
                swiper: thumb_slider,
            },
        });

        var swiper3 = new Swiper(".feat-swiper", {
            grabCursor: true,
            effect: "creative",
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: ["-20%", 0, -1],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
        });

        // input spinner
        var initQuantitySpinner = function() {

            $('.product-qty').each(function() {

                var $el_product = $(this);
                var quantity = 0;

                $el_product.find('.quantity-right-plus').click(function(e) {
                    e.preventDefault();
                    var quantity = parseInt($el_product.find('#quantity').val());
                    $el_product.find('#quantity').val(quantity + 1);
                });

                $el_product.find('.quantity-left-minus').click(function(e) {
                    e.preventDefault();
                    var quantity = parseInt($el_product.find('#quantity').val());
                    if (quantity > 0) {
                        $el_product.find('#quantity').val(quantity - 1);
                    }
                });

            });

        }


        // init jarallax parallax
        var initJarallax = function() {
            jarallax(document.querySelectorAll(".jarallax"));

            jarallax(document.querySelectorAll(".jarallax-img"), {
                keepImg: true,
            });
        }

        initJarallax();
        initQuantitySpinner();


    }); // End of a document

})(jQuery);

(function($) {
    "use strict";

    $(document).ready(function() {
        const popup = document.getElementById('servicePopup');
        const popupTitle = document.getElementById('popupTitle');
        const popupContent = document.getElementById('popupContent');
        const popupLink = document.getElementById('popupLink');

        if (!popup) {
            console.error("❌ Popup element not found!");
            return;
        }

        let isHoveringPopup = false;
        let isHoveringTrigger = false;

        document.querySelectorAll('.swiper-slide').forEach(slide => {
            const trigger = slide.querySelector('.icon-box');
            if (!trigger) return;

            trigger.addEventListener('mouseenter', () => {
                const title = slide.getAttribute('data-title');
                const desc = slide.getAttribute('data-description');
                const link = slide.getAttribute('data-link') || '#';
                const points = slide.getAttribute('data-points');

                let pointsList = '';
                if (points) {
                    const arrPoints = points.split(';');
                    pointsList = '<ul class="popup-points">';
                    arrPoints.forEach(p => {
                        pointsList += `<li>${p}</li>`;
                    });
                    pointsList += '</ul>';
                }

                popupTitle.textContent = title || '';
                popupContent.innerHTML = (desc || '') + pointsList; // ✅ gabungkan desc + list
                popupLink.setAttribute('href', link);

                const rect = trigger.getBoundingClientRect();
                popup.style.left = `${rect.left + window.scrollX}px`;
                popup.style.top = `${rect.bottom + window.scrollY + 10}px`;
                popup.style.display = 'block';
                isHoveringTrigger = true;
            });

            trigger.addEventListener('mouseleave', () => {
                isHoveringTrigger = false;
                setTimeout(() => {
                    if (!isHoveringPopup && !isHoveringTrigger) {
                        popup.style.display = 'none';
                    }
                }, 100); // Delay to allow hover transition
            });
        });

        popup.addEventListener('mouseenter', () => {
            isHoveringPopup = true;
        });

        popup.addEventListener('mouseleave', () => {
            isHoveringPopup = false;
            setTimeout(() => {
                if (!isHoveringTrigger) {
                    popup.style.display = 'none';
                }
            }, 100);
        });

    });
})(jQuery);


(function($) {
    "use strict";

    $(document).ready(function() {
        const seeAllBtn = document.querySelector("#our-services .btn");

        if (!seeAllBtn) {
            console.error("❌ See All button not found!");
            return;
        }

        seeAllBtn.addEventListener("click", function(e) {
            e.preventDefault();

            // Scroll ke header
            const header = document.querySelector("header");
            if (header) {
                header.scrollIntoView({ behavior: "smooth" });
            }

            // Tunggu sedikit biar scroll selesai, baru buka dropdown
            setTimeout(() => {
                const dropdownToggle = document.getElementById("dropdownPages");

                if (dropdownToggle) {
                    // Paksa buka dropdown bootstrap
                    const dropdown = new bootstrap.Dropdown(dropdownToggle);
                    dropdown.show();
                } else {
                    console.error("❌ Dropdown toggle element not found!");
                }
            }, 600);
        });
    });
})(jQuery);